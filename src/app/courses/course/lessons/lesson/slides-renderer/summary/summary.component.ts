import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {ToggleHeaderFooterService} from '../../../../../../shared/services/toggle-header-footer.service';
import {SlideService} from '../slide.service';
import {NavigateService} from '../../../../../../shared/services/navigate.service';
import {ActivatedRoute} from '@angular/router';
import {CurrentService} from '../../../../../../shared/services/current.service';
import {ExamResult, ExamService} from '../exam.service';
import {FinalExam} from '../../../../../../shared/models/profile';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {PROFILES} from '../../../../../../shared/data/collections';
import {CrudService} from '../../../../../../shared/services/crud.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit, AfterViewInit{
  @Input() slide: any;
  @Input() passingGrade?: number;
  terms!: string[];
  courseId!: string;
  isGuest = true;
  courseName = '';
  grade = 0;
  examResults: ExamResult[] = [];
  prevResult!: FinalExam;
  fullName!: string;

  constructor(
    private headerFooter: ToggleHeaderFooterService,
    private currentService: CurrentService,
    private slideService: SlideService,
    private navigate: NavigateService,
    private examService: ExamService,
    private route: ActivatedRoute,
    public auth: AngularFireAuth,
    private crud: CrudService,
  ) {
    this.courseId = this.route.snapshot.paramMap.get('courseId') || '';
  }

  ngOnInit() {
    this.terms = this.slide.content.terms.split(',');
    console.log(this.currentService.current.value)
    this.courseName = this.currentService.current.value.course.name;
    if (this.passingGrade) {
      this.getFullName();
      this.examResults = this.examService.results.value;
      this.prevResult = this.currentService.current.value.course.finalExam;
      this.grader();
    }
  }

  getFullName(): void {
    this.auth.authState.subscribe({
      next: user => {
        const uid = user?.uid;
        if (uid) {
          this.crud.docRef(PROFILES.path, uid).get()
            .then(snap => {
              this.fullName = `${snap.data().firstname} ${snap.data().lastname}` || snap.data().displayName || ''
            })
            .catch();
        }
      },
      error: err => console.log(err)
    });
  }

  ngAfterViewInit():void {
    const guest = document.getElementsByClassName('guest')[0] as HTMLElement;
    const registered = document.getElementsByClassName('registered')[0] as HTMLElement;
    if (guest && registered) {
      this.isGuest ?
        registered.style.display = 'none':
        guest.style.display = 'none';
    }
  }

  bye(): void {
    this.currentService.reset();
    this.slideService.reset();
    this.navigate.goto('courses', this.courseId);
    this.headerFooter.toggle(true, true);
    this.headerFooter.toggle(true, false);
  }

  grader(): void {
    let totalPoints = 0;
    const points = 5;
    this.examResults.forEach(q => {
      totalPoints += q.answers.length * points;

      // give points for the correct answers
      q.answered.forEach(a => this.grade += q.answers.includes(a) ? points : 0);

      // if it was a multi choice question and they chose more option than they should, deduct points
      this.grade -= (q.answered.length > q.answers.length) ? (q.answered.length - q.answers.length) * points : 0;
    })
    this.grade = (this.grade < 0) ? 0 : this.grade; // no negative results;
    this.grade = this.grade/totalPoints * 100;
  }

  issue(): void {

  }
}

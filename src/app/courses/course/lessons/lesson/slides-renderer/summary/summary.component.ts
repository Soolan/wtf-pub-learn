import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {ToggleHeaderFooterService} from '../../../../../../shared/services/toggle-header-footer.service';
import {SlideService} from '../slide.service';
import {NavigateService} from '../../../../../../shared/services/navigate.service';
import {ActivatedRoute} from '@angular/router';
import {CurrentService} from '../../../../../../shared/services/current.service';
import {ExamResult, ExamService} from '../exam.service';
import {FinalExam} from '../../../../../../shared/models/profile';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {CERTIFICATES, PROFILES} from '../../../../../../shared/data/collections';
import {CrudService} from '../../../../../../shared/services/crud.service';
import {CertLayout} from '../../../../../../shared/data/enums';
import {Certificate, Creator, Present} from '../../../../../../shared/models/certificate';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit, AfterViewInit {
  @Input() slide: any;
  @Input() passingGrade?: number;
  terms!: string[];
  courseId!: string;
  isGuest = true;
  courseName = '';
  userId = '';
  grade = 0;
  examResults: ExamResult[] = [];
  prevResult!: FinalExam;
  fullName!: string;
  editing = false;
  issuing = false;
  issued = false;
  certificate!: Certificate;

  constructor(
    private headerFooter: ToggleHeaderFooterService,
    private currentService: CurrentService,
    private slideService: SlideService,
    private navigate: NavigateService,
    private examService: ExamService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
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
        this.userId = user?.uid || '';
        if (this.userId) {
          this.crud.docRef(PROFILES.path, this.userId).get()
            .then(snap => {
              this.fullName = `${snap.data().firstname} ${snap.data().lastname}` || '';
              console.log(snap.data(), this.fullName, `${snap.data().firstname} ${snap.data().lastname}`, snap.data().display_name)
            })
            .catch();
        }
      },
      error: err => console.log(err)
    });
  }

  ngAfterViewInit(): void {
    const guest = document.getElementsByClassName('guest')[0] as HTMLElement;
    const registered = document.getElementsByClassName('registered')[0] as HTMLElement;
    if (guest && registered) {
      this.isGuest ?
        registered.style.display = 'none' :
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
    this.grade = this.grade / totalPoints * 100;
  }

  issue(): void {
    this.issuing = true;
    this.certificate = {
      courseId: this.courseId,
      courseName: this.courseName,
      userId: this.userId,
      fullName: this.fullName,
      grade: this.grade,
      timestamp: Date.now(),
      courseCreator: {fullName: 'S.S.Mava', profession: 'CEO, Write The Future'},
      present: {headline: '', description: ''},
      layout: CertLayout.Joy,
    }
    this.crud.add(CERTIFICATES.path, this.certificate)
      .then(_ => {
        this.snackBar
          .open('Issuing the new certificate...', 'X', {duration: 2500})
          .afterDismissed()
          .subscribe({
            next: _ => {
              this.issuing = false;
              this.issued = true;
            },
            error: err => console.log(err)
          });
      })
      .catch();
  }
}

import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {ToggleHeaderFooterService} from '../../../../../../shared/services/toggle-header-footer.service';
import {SlideService} from '../slide.service';
import {NavigateService} from '../../../../../../shared/services/navigate.service';
import {ActivatedRoute} from '@angular/router';
import {CurrentService} from '../../../../../../shared/services/current.service';
import {ExamService} from '../exam.service';

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

  constructor(
    private headerFooter: ToggleHeaderFooterService,
    private currentService: CurrentService,
    private slideService: SlideService,
    private navigate: NavigateService,
    private examService: ExamService,
    private route: ActivatedRoute,
  ) {
    this.courseId = this.route.snapshot.paramMap.get('courseId') || '';
  }

  ngOnInit() {
    this.terms = this.slide.content.terms.split(',');
    this.courseName = this.currentService.current.value.course.name;
    if (this.passingGrade) {
      this.grade();
      this.details();
    }
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

  grade(): number {
    let score = 0;
    let totalScore = 0;
    const points = 5;
    this.examService.results.value.forEach(q => {
      totalScore += q.answers.length * points;

      // give points for the correct answers
      q.answered.forEach(a => score += q.answers.includes(a) ? points : 0);

      // if it was a multi choice question and they chose more option than they should, deduct points
      score -= (q.answered.length > q.answers.length) ? (q.answered.length - q.answers.length) * points : 0;
    })
    score = (score < 0) ? 0 : score; // no negative results;
    return score/totalScore * 100;
  }

  details(): void {

  }
}

import {Component, Input, OnInit} from '@angular/core';
import {Status} from '../../../shared/data/enums';
import {STATUSES} from '../../../shared/data/generic';
import {Progress} from '../../../shared/models/profile';
import {CurrentService} from '../../../shared/services/current.service';
import {NavigateService} from '../../../shared/services/navigate.service';
import {LESSONS} from '../../../shared/data/collections';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit {
  @Input() courseId!: string;
  @Input() lessonId!: string;
  @Input() progress!: Progress;
  status = Status;
  totalSlides!: number;
  currentSlide!: number;

  constructor(
    private current: CurrentService,
    private navigate: NavigateService
  ) { }

  ngOnInit(): void {
    const lesson = this.progress.lessons.find(l => l.lesson_id == this.lessonId);
    this.totalSlides = lesson?.total_slides || 0;
    this.currentSlide = lesson?.current_slide || 0;
  }

  get statuses(): string[] {
    return STATUSES;
  }

  open(): void {
    this.navigate.goto(LESSONS.path, this.courseId, this.lessonId);
  }

  // setCurrent(lessonId: string): void {
  //   const lessonName = this.lessons.find(lesson => lesson.id === lessonId).name;
  //   this.current.next({
  //     course: this.course.name,
  //     lesson: lessonName
  //   })
  // }
}

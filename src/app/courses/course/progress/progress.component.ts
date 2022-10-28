import {Component, Input, OnInit} from '@angular/core';
import {Status} from '../../../shared/data/enums';
import {STATUSES} from '../../../shared/data/generic';
import {Progress} from '../../../shared/models/profile';
import {CurrentService} from '../../../shared/services/current.service';
import {NavigateService} from '../../../shared/services/navigate.service';
import {LESSONS} from '../../../shared/data/collections';
import {Course} from '../../../shared/models/course';
import {Lesson} from '../../../shared/models/lesson';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit {
  @Input() course!: any;
  @Input() lesson!: any;
  @Input() progress!: Progress;
  status = Status;
  totalSlides!: number;
  currentSlide!: number;

  constructor(
    private current: CurrentService,
    private navigate: NavigateService
  ) { }

  ngOnInit(): void {
    const lesson = this.progress.lessons.find(l => l.lesson_id == this.lesson.id);
    this.totalSlides = lesson?.total_slides || 0;
    this.currentSlide = lesson?.current_slide || 0;
  }

  get statuses(): string[] {
    return STATUSES;
  }

  open(): void {
    this.current.next({
      courseId: this.course.id,
      course: this.course.name,
      lessonId: this.lesson.id,
      lesson: this.lesson.name
    });
    console.log(this.current.current.value.courseId);
    this.navigate.goto(LESSONS.path, this.course.id, this.lesson.id);
  }

}

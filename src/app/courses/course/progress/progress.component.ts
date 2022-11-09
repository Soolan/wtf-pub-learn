import {Component, Input, OnInit} from '@angular/core';
import {Status} from '../../../shared/data/enums';
import {STATUSES} from '../../../shared/data/generic';
import {Course, Info, Lesson} from '../../../shared/models/profile';
import {CurrentService} from '../../../shared/services/current.service';
import {NavigateService} from '../../../shared/services/navigate.service';
import {COURSES, LESSONS, P_COURSES, P_LESSONS, PROFILES, SLIDES} from '../../../shared/data/collections';
import {CrudService} from '../../../shared/services/crud.service';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit {
  @Input() userId!: any;
  @Input() course!: any;
  @Input() lesson?: any;
  status = Status;
  totalSlides!: number;
  currentSlide!: number;
  lessonStatus!: Status;
  path!: string;
  info!: Info;

  constructor(
    private crud: CrudService,
    private current: CurrentService,
    private navigate: NavigateService
  ) { }

  ngOnInit(): void {
    this.totalSlides = 0;
    this.currentSlide = 0;
    this.lessonStatus = Status.Start;
    this.info = {status: Status.Start, score: 0, updated_at: Date.now()};
    this.path = `${PROFILES.path}/${this.userId}/${P_COURSES.path}`;
    this.initProgress();
  }

  initProgress() {
    if(this.lesson) this.path += `/${this.course.id}/${P_LESSONS.path}`;
    this.crud.docRef(this.path, this.lesson ? this.lesson.id : this.course.id).get()
      .then(snap => {
        const progress = snap.data();
        if (progress && this.lesson) {
          this.totalSlides = progress.total_slides;
          this.currentSlide = progress.current_slide;
          this.lessonStatus = progress.info.status;
        } else if(progress && !this.lesson) {

        }
        else {
          this.setProgress();
        }
      })
      .catch(error => console.log(error))
    ;
  }

  setProgress(): void {
    this.setCourseProgress({name: this.course.name, info: this.info});
    this.crud.colRef(`${this.path}/${this.course.id}/${P_LESSONS.path}`).get()
    this.setLessonProgress({
      name: this.lesson.name,
      info: this.info,
      current_slide: 1,
      total_slides: this.totalSlides,
      slide_id: ''
    });
  }

  setCourseProgress(courseProgress: Course): void {
    this.crud.set(this.path, this.course.id, courseProgress).then().catch(error => console.log(error));
  }

  setLessonProgress(lessonProgress: Lesson): void {
    const slidesPath = `${COURSES.path}/${this.course.id}/${LESSONS.path}/${this.lesson.id}/${SLIDES.path}`;
    this.crud.colRef(slidesPath).get()
      .then(snap => {
        this.totalSlides = snap.docs.length;

        this.crud.set(`${this.path}/${this.course.id}/${P_LESSONS.path}`, this.lesson.id, lessonProgress)
          .then(_ => console.log('lesson progress initiated for the first time',))
          .catch(error => console.log(error))
        ;
      })
      .catch(error => console.log(error))
    ;
  }

  get statuses(): string[] {
    return STATUSES;
  }

  open(): void {
    console.log('yaw')
    this.crud.update(this.path, this.course.id, {info: {status: Status.Resume, score: 0, updated_at: Date.now()}})
      .then(_ => this.navigate.goto(LESSONS.path, this.course.id, this.lesson.id))
      .catch(error => console.log(error))
    ;
  }
}

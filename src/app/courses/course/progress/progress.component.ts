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
  @Input() lesson!: any;
  status = Status;
  totalSlides!: number;
  currentSlide!: number;
  lessonStatus!: Status;
  lessonScore!: number;
  courseStatus!: Status;
  courseScore!: number;
  path!: string;
  info!: Info;

  constructor(
    private crud: CrudService,
    private current: CurrentService,
    private navigate: NavigateService
  ) {
  }

  ngOnInit(): void {
    this.totalSlides = 0;
    this.currentSlide = 0;
    this.lessonStatus = Status.Start;
    this.info = {status: Status.Start, score: 0, updated_at: Date.now()};
    this.path = `${PROFILES.path}/${this.userId}/${P_COURSES.path}`;
    this.initProgress();
  }

  initProgress() {
    this.crud.docRef(this.path, this.course.id).get()
      .then(snap => {
        const progress = snap.data();
        if (progress) {
          this.courseScore = progress.info.score;
          this.courseStatus = progress.info.status;
          this.getLessonProgress();
        } else {
          this.setProgress();
        }
      })
      .catch(error => console.log(error))
    ;
  }

  getLessonProgress(): void {
    this.path += `/${this.course.id}/${P_LESSONS.path}`;
    this.crud.docRef(this.path, this.lesson.id).get()
      .then(snap => {
        const progress = snap.data();
        this.totalSlides = progress.total_slides;
        this.currentSlide = progress.current_slide;
        this.lessonStatus = progress.info.status;
      })
      .catch(error => console.log(error))
    ;
  }

  setProgress(): void {
    let lesson: any;
    this.setCourseProgress({name: this.course.name, info: this.info});
    this.crud.colRef(`${this.path}/${this.course.id}/${P_LESSONS.path}`).get()
      .then(snap => {
        lesson = snap.docs.filter(doc => doc.data().published == true)
          .map(doc => {
            return {id: doc.id, ...doc.data()}
          })[0];
        this.setLessonProgress({
          name: lesson.name,
          info: this.info,
          current_slide: 1,
          slide_id: ''
        }, lesson.id);
      })
      .catch();
  }

  setCourseProgress(courseProgress: Course): void {
    this.crud.set(this.path, this.course.id, courseProgress).then().catch(error => console.log(error));
  }

  setLessonProgress(lessonProgress: Lesson, id: string): void {
    const slidesPath = `${COURSES.path}/${this.course.id}/${LESSONS.path}/${id}/${SLIDES.path}`;
    this.crud.colRef(slidesPath).get()
      .then(snap => {
        this.totalSlides = snap.docs.length;

        this.crud.set(`${this.path}/${this.course.id}/${P_LESSONS.path}`, id, lessonProgress)
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

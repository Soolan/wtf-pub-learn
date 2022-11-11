import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Status} from '../../../shared/data/enums';
import {ACTIONS, STATUSES} from '../../../shared/data/generic';
import {Course, Info, Lesson} from '../../../shared/models/profile';
import {CurrentService} from '../../../shared/services/current.service';
import {NavigateService} from '../../../shared/services/navigate.service';
import {COURSES, LESSONS, P_COURSES, P_LESSONS, PROFILES, SLIDES} from '../../../shared/data/collections';
import {CrudService} from '../../../shared/services/crud.service';
import {SlideService} from '../lessons/lesson/slides-renderer/slide.service';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit, OnChanges {
  @Input() userId!: any;
  @Input() course!: any;
  @Input() lesson!: any;
  @Input() slides!: number;

  courseStatus!: Status;
  courseScore!: number;
  currentSlide!: number;
  lessonSlides!: any[];
  lessonStatus!: Status;
  lessonScore!: number;
  lessonUpdate!:number;

  status = Status;
  path!: string;
  info!: Info;

  constructor(
    private crud: CrudService,
    private current: CurrentService,
    private navigate: NavigateService,
    private slideService: SlideService,
  ) { }

  ngOnInit(): void {
    this.currentSlide = 0;
    this.lessonStatus = Status.Start;
    this.info = {status: Status.Start, score: 0, updated_at: Date.now()};
    this.path = `${PROFILES.path}/${this.userId}/${P_COURSES.path}`;
    this.initProgress();
    this.initSlides()
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  initSlides() {
    console.log(`${COURSES.path}/${this.course.id}/${LESSONS.path}/${this.lesson.id}/${SLIDES.path}`)
    this.crud.colRef(`${COURSES.path}/${this.course.id}/${LESSONS.path}/${this.lesson.id}/${SLIDES.path}`).get()
      .then(snap => {
        this.lessonSlides = snap.docs.map(doc => doc.data());
        this.lessonSlides.sort((a, b) => {return a.order - b.order});
        console.log(this.lessonSlides)
      })
      .catch()
    ;
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
          this.setCourseProgress({name: this.course.name, info: this.info});
        }
      })
      .catch(error => console.log(error))
    ;
  }

  getLessonProgress(): void {
    this.crud.docRef(`${this.path}/${this.course.id}/${P_LESSONS.path}`, this.lesson.id).get()
      .then(snap => {
        const progress = snap.data();
        if (progress) {
          this.currentSlide = progress.current_slide;
          this.lessonStatus = progress.info.status;
          this.lessonScore = progress.info.score;
          this.lessonUpdate = progress.info.updated_at;
        }
      })
      .catch(error => console.log(error))
    ;
  }

  setCourseProgress(courseProgress: Course): void {
    this.crud.set(this.path, this.course.id, courseProgress)
      .then(_ => this.setLessonProgress({name: this.lesson.name, current_slide: 1, slide_id: '', info: this.info}))
      .catch(error => console.log(error));
  }

  setLessonProgress(lessonProgress: Lesson): void {
    this.crud.set(`${this.path}/${this.course.id}/${P_LESSONS.path}`, this.lesson.id, lessonProgress)
      .then(_ => console.log('lesson progress initiated for the first time',))
      .catch(error => console.log(error))
    ;
  }

  get statuses(): string[] {
    return STATUSES;
  }

  open(status: Status): void {
    let info = {...this.info};
    info.updated_at = Date.now();
    info.status = Status.Resume;
    info.score = this.courseScore;

    this.crud.update(this.path, this.course.id, {info})
      .then(_ => {
        switch (status) {
          case Status.Start:
            break;
          case Status.Resume:
            this.slideService.next({
              marker: this.currentSlide,
              action: ACTIONS[this.lessonSlides[this.currentSlide].type],
              response: '',
              correct: false,
              completed: false
            });
            break;
          case Status.Retake:
            this.slideService.next({
              marker: 0,
              action: ACTIONS[this.lessonSlides[0].type],
              response: '',
              correct: false,
              completed: false
            });
            info.score = this.lessonScore;
            const path = `${this.path}/${this.course.id}/${P_LESSONS.path}`;
            this.crud.update(path, this.lesson.id, {current_slide: 1, info}).then().catch();
            break;
        }
        this.navigate.goto(LESSONS.path, this.course.id, this.lesson.id)
      })
      .catch(error => console.log(error))
    ;
  }
}

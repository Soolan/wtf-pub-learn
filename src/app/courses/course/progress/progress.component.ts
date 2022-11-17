import {Component, Input, OnInit} from '@angular/core';
import {Status} from '../../../shared/data/enums';
import {ACTIONS, STATUSES} from '../../../shared/data/generic';
import {Lesson} from '../../../shared/models/profile';
import {Current, CurrentService} from '../../../shared/services/current.service';
import {NavigateService} from '../../../shared/services/navigate.service';
import {COURSES, LESSONS, P_COURSES, P_LESSONS, PROFILES, SLIDES} from '../../../shared/data/collections';
import {CrudService} from '../../../shared/services/crud.service';
import {SlideService} from '../lessons/lesson/slides-renderer/slide.service';
import {AngularFireAnalytics} from '@angular/fire/compat/analytics';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit {
  @Input() userId!: any;
  @Input() course!: any;
  @Input() lesson!: any;
  @Input() slides!: number;

  lessonSlides!: any[];
  status = Status;
  current!: Current;
  path!: string;

  constructor(
    private crud: CrudService,
    private navigate: NavigateService,
    private slideService: SlideService,
    private currentService: CurrentService,
    private analytics: AngularFireAnalytics
  ) { }

  ngOnInit(): void {
    this.current = this.currentService.current.value;
    this.path = `${PROFILES.path}/${this.userId}/${P_COURSES.path}`;
    this.initProgress();
    this.initSlides()
  }

  initSlides() {
    this.crud.colRef(`${COURSES.path}/${this.course.id}/${LESSONS.path}/${this.lesson.id}/${SLIDES.path}`).get()
      .then(snap => {
        this.lessonSlides = snap.docs.map(doc => doc.data());
        this.lessonSlides.sort((a, b) => {return a.order - b.order});
      })
      .catch()
    ;
  }

  initProgress() {
    this.crud.docRef(this.path, this.course.id).get()
      .then(snap => {
        const progress = snap.data();
        if (progress) {
          this.current.course = progress;
          this.getLessonProgress();
        } else {
          this.setCourseProgress();
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
          this.current.lesson = progress;
          console.log(this.current);
          this.currentService.current.next(this.current);
        }
      })
      .catch(error => console.log(error))
    ;
  }

  setCourseProgress(): void {
    this.crud.set(this.path, this.course.id, this.current.course)
      .then(_ => this.setLessonProgress(this.current.lesson))
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
    this.crud.update(this.path, this.course.id, this.currentService.current.value.course)
      .then(_ => {
        const lesson = {...this.currentService.current.value.lesson};
        const course = {...this.currentService.current.value.course};
        switch (status) {
          case Status.Start:
            this.analytics.logEvent('lesson_start', {course: this.course.id, lesson: this.lesson.id})
              .then().catch();
            course.info.status = Status.Resume;
            course.info.score = 100;
            course.info.updated_at = Date.now();
            this.crud.update(this.path, this.course.id, course).then().catch();
            break;
          case Status.Resume:
            this.slideService.next({
              marker: lesson.current_slide,
              action: ACTIONS[this.lessonSlides[lesson.current_slide].type],
              response: '',
              correct: false,
              completed: false
            });
            break;
          case Status.Retake:
            this.analytics.logEvent('lesson_retake', {course: this.course.id, lesson: this.lesson.id})
              .then().catch();
            this.slideService.next({
              marker: 0,
              action: ACTIONS[this.lessonSlides[0].type],
              response: '',
              correct: false,
              completed: false
            });
            const path = `${this.path}/${this.course.id}/${P_LESSONS.path}`;
            lesson.current_slide = 1;
            lesson.info.status = Status.Start;
            lesson.info.score = 100;
            lesson.info.updated_at = Date.now();
            this.crud.update(path, this.lesson.id, lesson).then().catch();
            break;
        }
        this.navigate.goto(LESSONS.path, this.course.id, this.lesson.id)
      })
      .catch(error => console.log(error))
    ;
  }
}

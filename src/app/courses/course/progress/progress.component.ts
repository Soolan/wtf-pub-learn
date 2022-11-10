import {Component, HostListener, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Status} from '../../../shared/data/enums';
import {ACTIONS, STATUSES} from '../../../shared/data/generic';
import {Course, Info, Lesson} from '../../../shared/models/profile';
import {CurrentService} from '../../../shared/services/current.service';
import {NavigateService} from '../../../shared/services/navigate.service';
import {COURSES, LESSONS, P_COURSES, P_LESSONS, PROFILES, SLIDES} from '../../../shared/data/collections';
import {CrudService} from '../../../shared/services/crud.service';
import {SlideService} from '../lessons/lesson/slides-renderer/slide.service';
import {ActivatedRoute} from '@angular/router';

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

  status = Status;
  currentSlide!: number;
  lessonStatus!: Status;
  lessonScore!: number;
  courseStatus!: Status;
  courseScore!: number;
  path!: string;
  info!: Info;
  mySlides!: any[];

  constructor(
    private crud: CrudService,
    private current: CurrentService,
    private navigate: NavigateService,
    private slideService: SlideService,
    private route: ActivatedRoute
  ) {
  }

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
    this.crud.colRef(`${COURSES.path}/${this.course.id}/${LESSONS.path}/${this.lesson.id}/${SLIDES.path}`).get()
      .then(snap => {
        this.mySlides = snap.docs.map(doc => doc.data());
        this.mySlides.sort((a,b) => {return a.order - b.order});
        console.log(this.mySlides)
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
          this.lessonScore = progress.lessonScore;
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

  open(isResume?: boolean): void {
    if (isResume) {
      this.slideService.next({
        marker: this.currentSlide,
        action: ACTIONS[this.mySlides[this.currentSlide].type],
        response: '',
        correct: false,
        completed: false
      })
    }
    this.crud.update(this.path, this.course.id, {info: {status: Status.Resume, score: 0, updated_at: Date.now()}})
      .then(_ => this.navigate.goto(LESSONS.path, this.course.id, this.lesson.id))
      .catch(error => console.log(error))
    ;
  }
}

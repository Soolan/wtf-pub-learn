import {Component, Input, OnInit} from '@angular/core';
import {Status} from '../../../shared/data/enums';
import {STATUSES} from '../../../shared/data/generic';
import {Course, Info, Lesson} from '../../../shared/models/profile';
import {CurrentService} from '../../../shared/services/current.service';
import {NavigateService} from '../../../shared/services/navigate.service';
import {LESSONS, P_COURSES, P_LESSONS, PROFILES} from '../../../shared/data/collections';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {CrudService} from '../../../shared/services/crud.service';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit {
  @Input() course!: any;
  @Input() lesson!: any;
  status = Status;
  totalSlides!: number;
  currentSlide!: number;
  lessonStatus!: Status;
  userId!: string;

  constructor(
    private crud: CrudService,
    public auth: AngularFireAuth,
    private current: CurrentService,
    private navigate: NavigateService
  ) {
    this.auth.authState.subscribe({
      next: user => {
        if (user) {
          this.userId = user.uid;
          this.initProgress();
        }
      },
      error: error => console.log(error)
    });
  }

  ngOnInit(): void {
    this.totalSlides = 0;
    this.currentSlide = 0;
    this.lessonStatus = Status.Start;
    this.initProgress();
  }

  initProgress() {
    this.crud.docRef(`${PROFILES.path}/${this.userId}/${P_COURSES.path}/${this.course.id}`, this.lesson.id).get()
      .then(snap => {
        snap.data() ? this.setSlides(snap.data()) : this.setProgress();
      })
      .catch(error => console.log(error))
    ;
  }

  setSlides(lessonProgress: Lesson): void {
    this.totalSlides = lessonProgress.total_slides;
    this.currentSlide = lessonProgress.current_slide;
  }

  setProgress(): void {
    const info: Info = {status: Status.Start, score: 0, updated_at: Date.now()};
    const courseProgress: Course = {name: this.course.name, info};
    const lessonProgress: Lesson = {name: this.lesson.name, info, current_slide: 0, total_slides: 0, slide_id: ''};
    const path = `${PROFILES.path}/${this.userId}/${P_COURSES.path}`

    this.crud.set(path, this.course.id, courseProgress)
      .then(_ => console.log('course progress initiated for the first time',))
      .catch(error => console.log(error))
    ;

    this.crud.set(`${path}/${this.course.id}/${P_LESSONS.path}`, this.lesson.id, lessonProgress)
      .then(_ => console.log('lesson progress initiated for the first time',))
      .catch(error => console.log(error))
    ;

  }

  get statuses(): string[] {
    return STATUSES;
  }

  open(): void {
    this.navigate.goto(LESSONS.path, this.course.id, this.lesson.id);
  }

}

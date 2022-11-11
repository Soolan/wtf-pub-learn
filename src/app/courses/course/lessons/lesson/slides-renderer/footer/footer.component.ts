import {Component, Input, OnInit} from '@angular/core';
import {SlideService} from '../slide.service';
import {BOUNCE} from '../../../../../../shared/animations/bounce';
import {STRETCH} from '../../../../../../shared/animations/strech';
import {ACTIONS} from '../../../../../../shared/data/generic';
import {SlideHeaderFooter} from '../../../../../../shared/models/slide';
import {SlideType, Status} from '../../../../../../shared/data/enums';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {CrudService} from '../../../../../../shared/services/crud.service';
import {P_COURSES, P_LESSONS, PROFILES} from '../../../../../../shared/data/collections';
import firebase from 'firebase/compat';
import {Lesson} from '../../../../../../shared/models/profile';
import DocumentReference = firebase.firestore.DocumentReference;

@Component({
  selector: 'app-renderer-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  animations: [BOUNCE, STRETCH]
})
export class FooterComponent implements OnInit {
  @Input() courseId!: any;
  @Input() lessonId!: any;
  @Input() totalSlides!: number;
  response!: string;
  width = 0;
  startSlide = false;
  staticSlide = false;
  hintFillInSlide = false;
  ui!: SlideHeaderFooter;
  userId!: string | undefined;
  progressRef!: DocumentReference;
  lessonProgress!: Lesson;

  constructor(
    private crud: CrudService,
    private auth: AngularFireAuth,
    private slideService: SlideService,
  ) {
    this.auth.currentUser
      .then(user => {
        this.userId = user?.uid;
        if(this.userId) {
          const path = `${PROFILES.path}/${this.userId}/${P_COURSES.path}/${this.courseId}/${P_LESSONS.path}`;
          this.progressRef = this.crud.docRef(path, this.lessonId);
          this.progressRef.get()
            .then(snap => this.lessonProgress = snap.data() as Lesson)
            .catch()
          ;
        }
      })
      .catch()
    ;
  }

  ngOnInit(): void {
    this.slideService.ui.subscribe({
      next: data => {
        this.ui = data;
        this.initSlideType(data.marker);
        this.setResponse(data.response);
      },
      error: error => console.log(error)
    });
  }

  initSlideType(marker: number): void {
    this.startSlide = marker === SlideType.Start;
    this.staticSlide = this.slideService.slides[marker].type === SlideType.Static;
    this.hintFillInSlide = this.slideService.slides[marker].type === SlideType.HintFillIn;
  }

  setResponse(response: string): void {
    this.response = '';
    setTimeout(_ => {
      this.response = response;
    }, 200)
  }

  move(forward: boolean): void {
    const index = forward ? this.ui.marker + 1 : this.ui.marker - 1;
    console.log(forward, index);
    this.slideService.next({
      marker: index,
      action: ACTIONS[this.slideService.slides[index].type],
      response: '',
      correct: false,
      completed: false
    })
    console.log(this.lessonProgress.current_slide, index)
    if(this.userId && forward && index > this.lessonProgress.current_slide) {
      this.lessonProgress.info.updated_at = Date.now();
      this.lessonProgress.current_slide ++;
      this.lessonProgress.info.status =
        this.lessonProgress.current_slide == this.totalSlides -1 ?
          Status.Retake:
          Status.Resume;
      this.progressRef.update(this.lessonProgress);
    }
  }

  hint(): void {
    // @ts-ignore
    const hint = this.slideService.slides[this.slideService.markerIndex].content['hint'];
    this.slideService.next({
      marker: this.ui.marker,
      action: this.ui.action,
      response: hint,
      correct: false,
      completed: false
    })
  }
}

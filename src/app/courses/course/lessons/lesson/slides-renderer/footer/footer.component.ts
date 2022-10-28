import {Component, Input, OnInit} from '@angular/core';
import {SlideService} from '../slide.service';
import {BOUNCE} from '../../../../../../shared/animations/bounce';
import {STRETCH} from '../../../../../../shared/animations/strech';
import {ACTIONS} from '../../../../../../shared/data/generic';
import {SlideHeaderFooter} from '../../../../../../shared/models/slide';
import {SlideType} from '../../../../../../shared/data/enums';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {CrudService} from '../../../../../../shared/services/crud.service';
import {PROFILES, PROGRESSES} from '../../../../../../shared/data/collections';
import firebase from 'firebase/compat';
import DocumentReference = firebase.firestore.DocumentReference;
import {LessonProgress, Progress} from '../../../../../../shared/models/profile';

@Component({
  selector: 'app-renderer-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  animations: [BOUNCE, STRETCH]
})
export class FooterComponent implements OnInit {
  @Input() courseId!: any;
  @Input() lessonId!: any;
  response!: string;
  width = 0;
  startSlide = false;
  staticSlide = false;
  hintFillInSlide = false;
  ui!: SlideHeaderFooter;
  userId!: string | undefined;
  progressRef!: DocumentReference;
  progress!: any;
  lessonProgress!: LessonProgress;

  constructor(
    private crud: CrudService,
    private auth: AngularFireAuth,
    private slideService: SlideService,
  ) {
    this.auth.currentUser
      .then(user => {
        this.userId = user?.uid;
        if(this.userId) {
          this.progressRef = this.crud.docRef(`${PROFILES.path}/${this.userId}/${PROGRESSES.path}`, this.courseId);
          this.progressRef.get()
            .then(snap => {
              this.progress = snap.data();
              this.lessonProgress = this.progress.lessons.find(l => l.lesson_id == this.lessonId);
            })
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
    console.log(index, ACTIONS[this.slideService.slides[index].type], this.slideService.slides[index])
    this.slideService.next({
      marker: index,
      action: ACTIONS[this.slideService.slides[index].type],
      response: '',
      correct: false,
      completed: false
    })
    if(this.userId) {


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

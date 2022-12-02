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
import {CurrentService} from '../../../../../../shared/services/current.service';
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
  @Input() order!: number;
  response!: string;
  width = 0;
  startSlide = false;
  staticSlide = false;
  pollSlide = false;
  hintFillInSlide = false;
  ui!: SlideHeaderFooter;
  userId!: string | undefined;

  lessonRef!: DocumentReference;
  lessonProgress!: Lesson;
  lessonPath!: string;

  courseRef!: DocumentReference;
  coursePath!: string;

  constructor(
    private crud: CrudService,
    private auth: AngularFireAuth,
    public slideService: SlideService,
    private currentService: CurrentService
  ) {
    this.auth.currentUser
      .then(user => {
        this.userId = user?.uid;
        if (this.userId) {
          this.coursePath = `${PROFILES.path}/${this.userId}/${P_COURSES.path}`;
          this.lessonPath = `${this.coursePath}/${this.courseId}/${P_LESSONS.path}`;
          this.lessonRef = this.crud.docRef(this.lessonPath, this.lessonId);
          this.lessonRef.get().then(snap => this.lessonProgress = snap.data() as Lesson).catch();
        }
      })
      .catch()
    ;
  }

  ngOnInit(): void {
    this.slideService.ui.subscribe({
      next: data => {
        this.response = '';
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
    this.pollSlide = this.slideService.slides[marker].type === SlideType.Poll;
    this.hintFillInSlide = this.slideService.slides[marker].type === SlideType.HintFillIn;
  }

  setResponse(response: string): void {
    setTimeout(_ => {
      this.response = response;
    }, 200)
  }

  move(forward: boolean): void {
    const index = forward ? this.ui.marker + 1 : this.ui.marker - 1;
    const action = ACTIONS[this.slideService.slides[index].type];
    this.slideService.next({marker: index, action, response: '', correct: false, completed: false});

    if (this.userId && forward && index > this.lessonProgress.current_slide) {
      this.updateLessonProgress();
    }
  }

  hint(): void {
    // @ts-ignore
    const hint = this.slideService.slides[this.slideService.markerIndex].content['hint'];
    this.slideService.next(
      {marker: this.ui.marker, action: this.ui.action, response: hint, correct: false, completed: false}
    )
  }

  updateLessonProgress(): void {
    this.lessonProgress.current_slide++;
    this.lessonProgress.info.updated_at = Date.now();
    this.lessonProgress.info.status =
      this.lessonProgress.current_slide > this.totalSlides - 2 ? Status.Retake : Status.Resume;
    const current = {...this.currentService.current.value};
    current.lesson = this.lessonProgress;
    console.log(current);
    this.currentService.current.next(current);
    this.lessonRef.update(this.lessonProgress)
      .then( _ => (this.lessonProgress.info.status == Status.Retake) ? this.allPassed() : '')
      .catch()
    ;
  }

  allPassed(): void {
    this.crud.colRef(this.lessonPath).get()
      .then(snap => {
        const passedScores = snap.docs.map(doc => {
          return {completed: doc.data().info.status == Status.Retake, score: doc.data().info.score}
        });
        if (!passedScores.find(lesson => !lesson.completed)) {
          const totalScore = passedScores
            .map(lesson => lesson.score)
            .reduce((a, b) => a + b, 0);

          this.updateCourseProgress(totalScore / passedScores.length)
        }
        console.log(passedScores);
      })
      .catch()
    ;
  }

  updateCourseProgress(score: number): void {
    const info = {updated_at: Date.now(), status: Status.Retake, score: score};
    const current = {...this.currentService.current.value};
    current.course.info = info;
    this.currentService.current.next(current);         // update service
    this.courseRef = this.crud.docRef(this.coursePath, this.courseId);
    this.courseRef.update({info}).then().catch(); // update firestore
  }
}

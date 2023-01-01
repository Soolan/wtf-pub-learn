import {Component, Input, OnInit} from '@angular/core';
import {Status, TxType} from '../../../shared/data/enums';
import {ACTIONS, CRYPTO_SYMBOLS, STATUSES} from '../../../shared/data/generic';
import {Course, Info, Lesson, Profile} from '../../../shared/models/profile';
import {Current, CurrentService} from '../../../shared/services/current.service';
import {NavigateService} from '../../../shared/services/navigate.service';
import {COURSES, LESSONS, P_COURSES, P_LESSONS, PROFILES, SLIDES, TRANSACTIONS} from '../../../shared/data/collections';
import {CrudService} from '../../../shared/services/crud.service';
import {SlideService} from '../lessons/lesson/slides-renderer/slide.service';
import {AngularFireAnalytics} from '@angular/fire/compat/analytics';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {Balance} from '../../../shared/models/balance';
import {WalletComponent} from '../../../shared/components/dialogs/wallet/wallet.component';
import {TopUpPleaseComponent} from '../../../shared/components/dialogs/top-up-please/top-up-please.component';
import {MatDialog} from '@angular/material/dialog';
import {Transaction} from '../../../shared/models/transaction';

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
  coursePath!: string;
  courseProgress!: Course;
  lessonPath!: string;
  lessonProgress!: Lesson;
  currentSlide!: number;
  loading = true;
  cryptoSymbols = CRYPTO_SYMBOLS;
  profile!: Profile;


  constructor(
    public dialog: MatDialog,
    private crud: CrudService,
    private navigate: NavigateService,
    private slideService: SlideService,
    private currentService: CurrentService,
    private analytics: AngularFireAnalytics
  ) {
  }

  ngOnInit(): void {
    this.coursePath = `${PROFILES.path}/${this.userId}/${P_COURSES.path}`;
    this.lessonPath = `${this.coursePath}/${this.course.id}/${P_LESSONS.path}`;
    this.initProfile();
    this.initProgress();
    this.initSlides();
  }

  initProfile(): void {
    this.crud.get(PROFILES.path, this.userId).subscribe({
      next: profile => {
        this.profile = profile;
        console.log(profile)
      },
      error: error => console.log(error)
    })
  }

  initProgress(): void {
    this.crud.docRef(this.coursePath, this.course.id).get()
      .then(snap => {
        const progress = snap.data();
        if (progress) {
          this.courseProgress = progress;
          this.getLessonProgress();
        } else {
          this.setCourseProgress();
        }
      })
      .catch(error => console.log(error))
    ;
  }

  getLessonProgress(): void {
    this.crud.docRef(`${this.coursePath}/${this.course.id}/${P_LESSONS.path}`, this.lesson.id).get()
      .then(snap => {
        const data = snap.data();
        if (data) {
          this.lessonProgress = data;
          this.currentSlide = data.current_slide;
        } else {
          this.setLessonProgress();
        }
      })
      .catch(error => console.log(error))
    ;
  }

  setCourseProgress(): void {
    this.courseProgress = {
      name: this.course.name, info: {
        status: Status.Start,
        score: 100,
        updated_at: Date.now()
      }
    };
    this.crud.set(this.coursePath, this.course.id, this.courseProgress)
      .then(_ => this.setLessonProgress())
      .catch(error => console.log(error));
  }

  setLessonProgress(): void {
    this.lessonProgress = {
      name: this.lesson.name,
      current_slide: 1,  // It is always 1, because Start slides is 0 and the Next Button shows up in the next slide
      info: {
        status: Status.Start,
        score: 100,
        updated_at: Date.now()
      }
    };
    this.crud.set(`${this.coursePath}/${this.course.id}/${P_LESSONS.path}`, this.lesson.id, this.lessonProgress)
      .then(_ => console.log("progress set for the first time."))
      .catch(error => console.log(error))
    ;
  }

  initSlides() {
    this.crud.colRef(`${COURSES.path}/${this.course.id}/${LESSONS.path}/${this.lesson.id}/${SLIDES.path}`).get()
      .then(snap => {
        this.lessonSlides = snap.docs.map(doc => doc.data());
        this.lessonSlides.sort((a, b) => {
          return a.order - b.order
        });
      })
      .catch()
    ;
  }

  get statuses(): string[] {
    return STATUSES;
  }

  open(status: Status): void {
    // this.current = this.currentService.current.value;
    switch (status) {
      case Status.Start:
        this.analytics.logEvent('lesson_start', {course: this.course.id, lesson: this.lesson.id})
          .then().catch();
        this.courseProgress.info.status = Status.Resume;
        this.courseProgress.info.score = 100;
        this.courseProgress.info.updated_at = Date.now();
        this.crud.update(this.coursePath, this.course.id, this.courseProgress).then().catch();
        break;
      case Status.Resume:
        this.courseProgress.info.updated_at = Date.now();
        this.crud.update(this.coursePath, this.course.id, this.courseProgress).then().catch();
        this.slideService.next({
          marker: this.currentSlide,
          action: ACTIONS[this.lessonSlides[this.currentSlide]?.type],
          response: '',
          correct: false,
          completed: false
        });
        break;
      case Status.Retake:
        this.analytics.logEvent('lesson_retake', {course: this.course.id, lesson: this.lesson.id})
          .then().catch();
        // this.analytics.setUserProperties({});
        this.slideService.next({
          marker: 0,
          action: ACTIONS[this.lessonSlides[0].type],
          response: '',
          correct: false,
          completed: false
        });
        this.lessonProgress.current_slide = 1;
        this.lessonProgress.info.score = 100;
        this.lessonProgress.info.updated_at = Date.now();
        this.crud.update(this.lessonPath, this.lesson.id, this.lessonProgress).then().catch();
        break;
    }
    this.currentService.next({
      courseId: this.course.id,
      course: this.courseProgress,
      lessonId: this.lesson.id,
      lesson: this.lessonProgress,
      points: 0
    });

    this.navigate.goto(LESSONS.path, this.course.id, this.lesson.id)
  }


  buy(index: string): void {
    const payOption = this.lesson.payOptions[Number(index)];
    const balance = this.profile.balances.find(balance => balance.currency == payOption.currency);
    const tag = this.profile.tag;
    if (!balance || balance.amount < payOption.amount) {
      this.dialog.open(TopUpPleaseComponent, {
        width: '400px',
        data: {balance, tag}
      });
    } else {
      this.saveTransactions(payOption, tag);
    }
  }

  saveTransactions (balance: Balance, tag: number): void {
    const data: Transaction = {
      type: TxType.Payment,
      from: tag,
      to: 1000,
      currency: balance,
      timestamp: Date.now()
    }
    const userTxPath = `${PROFILES.path}/${this.userId}/${TRANSACTIONS.path}`;
    this.crud.add(userTxPath, data)
      .then(ref => {
        //ToDo: show snackbar
        // this.updateBalance()
        this.lessonProgress.paid = ref.path;
        this.crud.update(this.lessonPath, this.lesson.id, this.lessonProgress).then().catch();
      })
      .catch()
    ;

    const hotWalletTxPath = `${PROFILES.path}/oLqFhLu5TBWFO0Zk7N7KcM5B47Cq/${TRANSACTIONS.path}`;
    this.crud.add(hotWalletTxPath, data).then().catch();
  }

  updateBalance(userId: string, balances: Balance[]): void {

  }


  // mat-select error handler ----------------------------------------------------------------------------------------
  disabled = true;
  selected = new FormControl('', [Validators.required]);
  selectFormControl = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();
}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

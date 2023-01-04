import {Component, Input, OnInit} from '@angular/core';
import {Status, TxType} from '../../../shared/data/enums';
import {ACTIONS, CRYPTO_SYMBOLS, STATUSES} from '../../../shared/data/generic';
import {Course, Lesson, Profile} from '../../../shared/models/profile';
import {CurrentService} from '../../../shared/services/current.service';
import {NavigateService} from '../../../shared/services/navigate.service';
import {COURSES, LESSONS, P_COURSES, P_LESSONS, PROFILES, SLIDES, TRANSACTIONS} from '../../../shared/data/collections';
import {CrudService} from '../../../shared/services/crud.service';
import {SlideService} from '../lessons/lesson/slides-renderer/slide.service';
import {AngularFireAnalytics} from '@angular/fire/compat/analytics';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {Balance} from '../../../shared/models/balance';
import {TopUpPleaseComponent} from '../../../shared/components/dialogs/top-up-please/top-up-please.component';
import {MatDialog} from '@angular/material/dialog';
import {Transaction} from '../../../shared/models/transaction';
import {MatSnackBar} from '@angular/material/snack-bar';
import {PaymentGatewayService} from '../../../shared/services/payment-gateway.service';

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
  hotWalletBalances!: Balance[];
  masterId: string = 'oLqFhLu5TBWFO0Zk7N7KcM5B47Cq';

  constructor(
    public dialog: MatDialog,
    private crud: CrudService,
    private snackBar: MatSnackBar,
    private navigate: NavigateService,
    private slideService: SlideService,
    private currentService: CurrentService,
    private analytics: AngularFireAnalytics,
  ) {
  }

  ngOnInit(): void {
    this.coursePath = `${PROFILES.path}/${this.userId}/${P_COURSES.path}`;
    this.lessonPath = `${this.coursePath}/${this.course.id}/${P_LESSONS.path}`;
    this.initProfile();
    this.initProgress();
    this.initSlides();
    this.initHotWalletBalances();
  }

  initProfile(): void {
    this.crud.get(PROFILES.path, this.userId).subscribe({
      next: profile => this.profile = profile,
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

  initHotWalletBalances(): void {
    this.crud.docRef(PROFILES.path, this.masterId).get()
      .then(snap => this.hotWalletBalances = snap.data().balances)
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
    // console.log(payOption)
    if (!balance || balance.amount < payOption.amount) {
      this.dialog.open(TopUpPleaseComponent, {
        width: '400px',
        data: {balance, tag}
      });
    } else {
      const data: Transaction = {
        type: TxType.Payment,
        from: tag,
        to: 1000,
        currency: payOption,
        timestamp: Date.now()
      }
      this.addUserTx(data);
      this.addHotWalletTx(data);
    }
  }

  addUserTx(data: Transaction): void {
    const userTxPath = `${PROFILES.path}/${this.userId}/${TRANSACTIONS.path}`;
    this.crud.add(userTxPath, data)
      .then(ref => {
        //ToDo: show snackbar
        this.updateBalance(this.userId, this.profile.balances, data.currency, false);
        this.lessonProgress.paid = ref.path;
        this.crud.update(this.lessonPath, this.lesson.id, this.lessonProgress).then().catch();
      })
      .catch()
    ;
  }

  addHotWalletTx(data: Transaction): void {
    const hotWalletTxPath = `${PROFILES.path}/${this.masterId}/${TRANSACTIONS.path}`;
    this.crud.add(hotWalletTxPath, data)
      .then(_ => this.updateBalance(
        this.masterId,
        this.hotWalletBalances,
        data.currency,
        true
      ))
      .catch()
    ;
  }

  updateBalance(userId: string, balances: Balance[], payment: Balance, isDeposit: boolean): void {
    const balance = balances.find(b => b.currency == payment.currency);
    if (balance) {
      balance.amount = isDeposit ? Number(balance.amount) + payment.amount : balance.amount - payment.amount;
    } else {
      isDeposit ? balances.push(payment) : ''; // ToDo: Snackbar a message saying nothing to deduct
    }
    this.crud.update(PROFILES.path, userId, {balances})
      .then(_ => this.snackBar.open('Payment Successful!', 'X', {duration: 4000}))
      .catch()
    ;
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

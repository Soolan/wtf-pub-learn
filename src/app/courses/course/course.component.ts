import {Component, Input, OnInit} from '@angular/core';
import {COURSES, LESSONS, P_COURSES, P_LESSONS, PROFILES} from '../../shared/data/collections';
import {CrudService} from '../../shared/services/crud.service';
import {CURRENCIES, FINAL_EXAM_ID, LEVELS} from '../../shared/data/generic';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {ActivatedRoute} from '@angular/router';
import {CurrentService} from '../../shared/services/current.service';
import {FinalExam, Info} from '../../shared/models/profile';
import {Status} from '../../shared/data/enums';
import {AngularFireAnalytics} from '@angular/fire/compat/analytics';
import {map} from 'rxjs';
import {Release} from '../../shared/models/release';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  @Input() isDashboard!: boolean;
  @Input() id!: string; // needed when it is called from user dashboard
  userId!: string | undefined;
  courseId!: string;
  course!: any;
  lessons!: any[];
  loading!: any;
  levels = LEVELS;
  cryptoSymbols = CURRENCIES;
  status = Status;
  courseInfo!: Info;
  coursePayment!: string;
  lessonPayment!: string;
  finalExam!: FinalExam;
  coursePath!: string;

  constructor(
    private crud: CrudService,
    public auth: AngularFireAuth,
    private route: ActivatedRoute,
    public currentService: CurrentService,
    private analytics: AngularFireAnalytics
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.courseId = params['courseId'] || this.id;
        if (this.courseId) {
          this.initCourse();
        } else {
          // ToDo: implement dialog box
        }
      });
    this.loading = {course: true, lessons: true};
    this.auth.authState.subscribe({
      next: user => {
        if (user?.uid) {
          this.userId = user?.uid;
          this.coursePath = `${PROFILES.path}/${this.userId}/${P_COURSES.path}`;
          this.crud.docRef(this.coursePath, this.courseId).get()
            .then(snap => {
              if (snap.data()) {
                const data = snap.data();
                this.courseInfo = data.info;
                this.coursePayment = data.paid;
                this.finalExam = data.finalExam;
                this.currentService.next({
                  courseId: this.courseId,
                  course: {
                    name: data.name,
                    info: this.courseInfo,
                    finalExam: data.finalExam
                  },
                  lessonId: '',
                  lesson: {name: '', current_slide: 1, info: this.courseInfo},
                  points: 0,
                });
                console.log(this.currentService.current.value)
              }
            }).catch();
          this.analytics.setUserId(this.userId).then().catch();
        }
      },
      error: err => console.log(err)
    });
  }

  initCourse() {
    this.crud.docRef(COURSES.path, this.courseId).get()
      .then(snap => {
        this.course = snap.data();
        this.course.id = snap.id;
        this.loading.course = false;
        this.initLessons();
      })
      .catch(error => console.log(error))
    ;
  }

  initLessons(): void {
    this.crud.colRef(`${COURSES.path}/${this.courseId}/${LESSONS.path}`).get()
      .then(snap => {
        this.lessons = snap.docs
          .filter(doc => doc.id !== FINAL_EXAM_ID)
          .map(doc => {
            return {id: doc.id, ...doc.data()}
          });
        this.lessons.sort((a, b) => {
          return a.order - b.order
        });
        this.loading.lessons = false;
      })
      .catch()
    ;
  }

  get keyword(): string {
    const firstTag = this.course.tags[0];
    return this.course.name.includes(firstTag) ? firstTag : '';
  }

  get courseLevel(): string {
    return LEVELS[this.course.level];
  }
}

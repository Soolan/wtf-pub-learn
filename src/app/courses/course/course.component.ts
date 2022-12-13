import {Component, Input, OnInit} from '@angular/core';
import {COURSES, LESSONS, P_COURSES, P_LESSONS, PROFILES} from '../../shared/data/collections';
import {CrudService} from '../../shared/services/crud.service';
import {LEVELS} from '../../shared/data/generic';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {ActivatedRoute} from '@angular/router';
import {CurrentService} from '../../shared/services/current.service';
import {Info} from '../../shared/models/profile';
import {Status} from '../../shared/data/enums';
import {AngularFireAnalytics} from '@angular/fire/compat/analytics';

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
  status = Status;
  courseInfo!: Info;
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
                this.courseInfo = snap.data().info;
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
          .filter(doc => doc.data().published == true)
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
}

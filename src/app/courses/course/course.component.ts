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

  constructor(
    private crud: CrudService,
    public auth: AngularFireAuth,
    private route: ActivatedRoute,
    public currentService: CurrentService,
    private analytics: AngularFireAnalytics
  ) { }

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
        this.lessons.sort((a, b) => {return b.order - a.order});

        this.loading.lessons = false;
      })
      .catch()
    ;
  }

  get keyword(): string {
    const firstTag = this.course.tags[0];
    return this.course.name.includes(firstTag) ? firstTag : '';
  }

  get summary(): boolean {
    this.courseInfo = this.currentService.current.value.course.info;
    return this.courseInfo.status == Status.Retake;
  }
}

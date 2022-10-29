import {Component, Input, OnInit} from '@angular/core';
import {COURSES, LESSONS, P_COURSES, P_LESSONS, PROFILES} from '../../shared/data/collections';
import {CrudService} from '../../shared/services/crud.service';
import {LEVELS} from '../../shared/data/generic';
import {ActivatedRoute} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {Course, Info, Lesson} from '../../shared/models/profile';
import {Status} from '../../shared/data/enums';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  @Input() isDashboard!: boolean;
  @Input() id!: string;
  course!: any;
  lessons!: any[];
  loading!: any;
  keyword!: string;
  levels = LEVELS;
  userId!: string;
  progress!: Course;

  constructor(
    private crud: CrudService,
    public auth: AngularFireAuth,
    private route: ActivatedRoute
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
    this.loading = {course: true, lessons: true};
    if (this.id) {
      this.initCourse();
      this.initLessons();
    } else {
      // ToDo: implement dialog box
    }
  }

  initCourse() {
    this.crud.docRef(COURSES.path, this.id).get()
      .then(snap => {
        this.course = snap.data();
        this.loading.course = false;
        this.keyword = this.getKeyword();
      })
      .catch(error => console.log(error))
    ;
  }

  initLessons(): void {
    this.crud.colRef(`${COURSES.path}/${this.id}/${LESSONS.path}`).get()
      .then(snap => {
        this.lessons = snap.docs
          .filter(doc => doc.data().published == true)
          .map(doc => {
            return {id: doc.id, ...doc.data()}
          })
        this.loading.lessons = false;
      })
      .catch()
    ;
  }

  initProgress() {
    this.crud.docRef(`${PROFILES.path}/${this.userId}/${P_COURSES.path}`, this.id).get()
      .then(snap => {
        this.progress = snap.data();
        if (!this.progress) this.setProgress();
        console.log(this.progress);
      })
      .catch(error => console.log(error))
    ;
  }

  setProgress(): void {
    const info: Info = {status: Status.Start, score: 0, updated_at: Date.now()};
    const courseProgress: Course = {name: this.course.name, info};
    const lessonProgress: Lesson = {name: '', current_slide: 0, total_slides: 0, slide_id: '', info};
    const path = `${PROFILES.path}/${this.userId}/${P_COURSES.path}`

    this.crud.set(path, this.id, courseProgress)
      .then(_ => console.log('course progress initiated for the first time',))
      .catch(error => console.log(error))
    ;

    this.lessons.forEach(lesson => {
      lessonProgress.name = lesson.name;
      this.crud.set(`${path}/${this.id}/${P_LESSONS.path}`, lesson.id, lessonProgress)
        .then(_ => console.log('lesson progress initiated for the first time',))
        .catch(error => console.log(error))
      ;
    });

  }

  getKeyword(): string {
    const firstTag = this.course.tags[0];
    return this.course.name.includes(firstTag) ? firstTag : '';
  }
}

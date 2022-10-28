import {Component, Input, OnInit} from '@angular/core';
import {COURSES, LESSONS, PROFILES, PROGRESSES} from '../../shared/data/collections';
import {map} from 'rxjs';
import {CrudService} from '../../shared/services/crud.service';
import {LEVELS, STATUSES} from '../../shared/data/generic';
import {CurrentService} from '../../shared/services/current.service';
import {NavigateService} from '../../shared/services/navigate.service';
import {ActivatedRoute} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {Progress} from '../../shared/models/profile';
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
  progress!: Progress;

  constructor(
    private crud: CrudService,
    public auth: AngularFireAuth,
    private route: ActivatedRoute
  ) {
    this.id = this.route.snapshot.paramMap.get('courseId') || '';
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
    LESSONS.path = `${COURSES.path}/${this.id}/lessons`;
    this.crud.colRef(LESSONS.path).get()
      .then(snap => {
        this.lessons = snap.docs
          .filter(doc => doc.data().published == true)
          .map(doc => {
            return {id: doc.id, ...doc.data()}
          })
        console.log(this.lessons);
        this.loading.lessons = false;
      })
      .catch()
    ;
  }

  initProgress() {
    this.crud.docRef(`${PROFILES.path}/${this.userId}/${PROGRESSES.path}`, this.id).get()
      .then(snap => {
        this.progress = snap.data();
        if (!this.progress) this.setProgress();
        console.log(this.progress);
      })
      .catch(error => console.log(error))
    ;
  }

  setProgress(): void {
    const progress: Progress = {
      status: Status.Start,
      lessons: []
    };
    this.lessons.forEach(lesson => {
      const lessonProgress = {
        lesson_id: lesson.id,
        current_slide: 0,
        total_slides: 0,
        slide_id: '',
        status: Status.Start,
        score: 0,
        updated_at: Date.now()
      }
      progress.lessons.push(lessonProgress);
    });
    this.progress = progress;
    this.crud.set(`${PROFILES.path}/${this.userId}/${PROGRESSES.path}`, this.id, progress)
      .then(_ => console.log('progress initiated for the first time',))
      .catch(error => console.log(error))
    ;
  }

  getKeyword(): string {
    const firstTag = this.course.tags[0];
    return this.course.name.includes(firstTag) ? firstTag : '';
  }
}

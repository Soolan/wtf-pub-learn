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
  status = Status;


  constructor(
    private crud: CrudService,
    public auth: AngularFireAuth,
    private route: ActivatedRoute,
    private current: CurrentService,
    private navigate: NavigateService
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

  initProgress() {
    this.crud.docRef(`${PROFILES.path}/${this.userId}/${PROGRESSES.path}`, this.id).get()
      .then(snap => {
        this.progress = snap.data();
      })
      .catch(error => console.log(error))
    ;
  }

  initLessons(): void {
    LESSONS.path = `${COURSES.path}/${this.id}/lessons`
    this.crud.colRefQuery(LESSONS).pipe(
      map(this.crud.mapId),
    ).subscribe(
      {
        next: lessons => {
          this.lessons = lessons;
          if (this.userId && !this.progress) this.setProgress();
          this.loading.lessons = false;
        },
        error: error => console.log(error)
      }
    );
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
      this.crud.set(`${PROFILES.path}/${this.userId}/${PROGRESSES.path}`, this.id, progress)
        .then(_ => console.log('progress initiated for the first time', ))
        .catch(error => console.log(error))
      ;
  }

  getTotalSlides(lessonId: string): number {
    return this.progress.lessons.find(l => l.lesson_id == lessonId)?.total_slides || 0;
  }

  getCurrentSlide(lessonId: string): number {
    return this.progress.lessons.find(l => l.lesson_id == lessonId)?.current_slide || 0;
  }

  get statuses(): string[] {
    return STATUSES;
  }

  getKeyword(): string {
    const firstTag = this.course.tags[0];
    return this.course.name.includes(firstTag)? firstTag: '';
  }

  open(lessonId: string): void {
    this.setCurrent(lessonId);
    this.navigate.goto('lessons', this.id, lessonId);
  }

  setCurrent(lessonId: string): void {
    const lessonName = this.lessons.find(lesson => lesson.id === lessonId).name;
    this.current.next({
      course: this.course.name,
      lesson: lessonName
    })
  }
}

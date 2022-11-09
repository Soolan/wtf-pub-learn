import {Component, Input, OnInit} from '@angular/core';
import {COURSES, LESSONS, P_COURSES, P_LESSONS, PROFILES} from '../../shared/data/collections';
import {CrudService} from '../../shared/services/crud.service';
import {LEVELS} from '../../shared/data/generic';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  @Input() isDashboard!: boolean;
  @Input() id!: string; // needed when it is called from user dashboard
  courseId!: string;
  course!: any;
  lessons!: any[];
  loading!: any;
  keyword!: string;
  levels = LEVELS;

  constructor(
    private crud: CrudService,
    public auth: AngularFireAuth,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.loading = {course: true, lessons: true};
    this.courseId = this.route.snapshot.paramMap.get('courseId') || this.id;
    if (this.courseId) {
      this.initCourse();
    } else {
      // ToDo: implement dialog box
    }
  }

  initCourse() {
    this.crud.docRef(COURSES.path, this.courseId).get()
      .then(snap => {
        this.course = snap.data();
        this.course.id = snap.id;
        this.loading.course = false;
        this.keyword = this.getKeyword();
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
        this.loading.lessons = false;
      })
      .catch()
    ;
  }

  getKeyword(): string {
    const firstTag = this.course.tags[0];
    return this.course.name.includes(firstTag) ? firstTag : '';
  }
}

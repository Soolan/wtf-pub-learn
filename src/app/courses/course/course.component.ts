import {Component, OnInit} from '@angular/core';
import {COURSES, LESSONS} from '../../shared/data/collections';
import {map} from 'rxjs';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {CrudService} from '../../shared/services/crud.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  id!: string;
  course!: any;
  lessons!: any;
  loading!: any;

  constructor(
    private router: Router,
    private crud: CrudService,
    private route: ActivatedRoute
  ) {
    this.id = this.route.snapshot.paramMap.get('courseId') || '';
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

  private initCourse() {
    this.crud.get(COURSES.path, this.id).subscribe(
      {
        next: data => {
          this.course = data;
          console.log(this.course);
          this.loading.course = false;
        },
        error: error => console.log(error)
      }
    );
  }

  initLessons(): void {
    LESSONS.path = `${COURSES.path}/${this.id}/lessons`
    this.crud.colRefQuery(LESSONS).pipe(
      map(this.crud.mapId),
    ).subscribe(
      {
        next: lessons => {
          this.lessons = lessons;
          this.loading.lessons = false;
        },
        error: error => console.log(error)
      }
    );
  }
}

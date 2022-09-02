import {Component, Input, OnInit} from '@angular/core';
import {COURSES, LESSONS} from '../../shared/data/collections';
import {map} from 'rxjs';
import {CrudService} from '../../shared/services/crud.service';
import {LEVELS} from '../../shared/data/generic';
import {CurrentService} from '../../shared/services/current.service';
import {NavigateService} from '../../shared/services/navigate.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  @Input() isDashboard! : boolean;
  @Input() id!: string;
  course!: any;
  lessons!: any[];
  loading!: any;
  keyword!: string;
  levels = LEVELS;

  constructor(
    private crud: CrudService,
    private route: ActivatedRoute,
    private current: CurrentService,
    private navigate: NavigateService,
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
          this.loading.course = false;
          this.extractTags(this.course.tags);
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

  extractTags(input: string): void {
    const tags = this.course.tags.split(',');
    this.keyword = tags[0];
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

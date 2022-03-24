import {Component, OnInit} from '@angular/core';
import {LEVELS} from '../../../../shared/data/generic';
import {CrudService} from '../../../../shared/services/crud.service';
import {ToggleHeaderFooterService} from '../../../../shared/services/toggle-header-footer.service';
import {COURSES, LESSONS, SLIDES} from '../../../../shared/data/collections';
import {map} from 'rxjs';
import {SlideService} from './slides-renderer/slide.service';
import {CurrentService} from '../../../../shared/services/current.service';
import {NavigateService} from '../../../../shared/services/navigate.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss']
})
export class LessonComponent implements OnInit {
  course!: string;
  lesson!: string;
  courseId!: string;
  lessonId!: string;
  slides = [];
  loading = true;
  levels = LEVELS;

  constructor(
    private crud: CrudService,
    private route: ActivatedRoute,
    private navigate: NavigateService,
    private slideService: SlideService,
    private courseLesson: CurrentService,
    private headerFooter: ToggleHeaderFooterService
  ) {
    headerFooter.toggle(false, true);   // switch off header
    headerFooter.toggle(false, false);  // switch off footer
    this.courseId = this.route.snapshot.paramMap.get('courseId') || '';
    this.lessonId = this.route.snapshot.paramMap.get('lessonId') || '';
  }

  ngOnInit(): void {
    console.log(this.courseId, this.lessonId);
    if (this.courseId && this.lessonId) {
      SLIDES.path = `${COURSES.path}/${this.courseId}/${LESSONS.path}/${this.lessonId}/slides`;
      this.setNames();
      this.initSlides();
    } else {
      // ToDo: show a dialog
      console.log('lesson not found!');
    }
  }

  setNames(): void {
    this.courseLesson.current.subscribe({
      next: current => {
        if (current.course){
          this.course = current.course;
        } else {
          this.setCourseName();
        }

        if (current.lesson){
          this.lesson = current.lesson;
        } else {
          this.setLessonName();
        }
      },
      error: error => console.log(error)
    })
  }

  setCourseName(): void {
      this.crud.docRef('courses', this.courseId).get()
        .then(course => this.course = course.data().name)
        .catch(error => console.log(error))
      ;
  }

  setLessonName(): void {
      this.crud.docRef(`courses/${this.courseId}/lessons`, this.lessonId).get()
        .then(lesson => this.lesson = lesson.data().name)
        .catch(error => console.log(error))
      ;
  }

  initSlides(): void {
    this.crud.colRefQuery(SLIDES).pipe(
      map(this.crud.mapId),
    ).subscribe(
      {
        next: slides => {
          this.slides = slides;
          console.log(this.slides);
          this.loading = false;
        },
        error: error => console.log(error)
      }
    );
  }
}

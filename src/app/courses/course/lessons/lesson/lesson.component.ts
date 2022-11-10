import {Component, Input, OnInit} from '@angular/core';
import {LEVELS} from '../../../../shared/data/generic';
import {CrudService} from '../../../../shared/services/crud.service';
import {ToggleHeaderFooterService} from '../../../../shared/services/toggle-header-footer.service';
import {COURSES, LESSONS, SLIDES} from '../../../../shared/data/collections';
import {SlideService} from './slides-renderer/slide.service';
import {CurrentService} from '../../../../shared/services/current.service';
import {NavigateService} from '../../../../shared/services/navigate.service';
import {ActivatedRoute} from '@angular/router';
import {Slide} from '../../../../shared/models/slide';
import {map} from 'rxjs';

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
  slides!: Slide[];
  loading = true;
  levels = LEVELS;

  constructor(
    private crud: CrudService,
    private route: ActivatedRoute,
    private navigate: NavigateService,
    private slideService: SlideService,
    private headerFooter: ToggleHeaderFooterService
  ) {
    headerFooter.toggle(false, true);   // switch off header
    headerFooter.toggle(false, false);  // switch off footer
    this.courseId = this.route.snapshot.paramMap.get('courseId') || '';
    this.lessonId = this.route.snapshot.paramMap.get('lessonId') || '';
    if (this.courseId && this.lessonId) {
      this.progress();
      this.initSlides();
    } else {
      // ToDo: show a dialog
      console.log('lesson not found!');
    }
  }

  ngOnInit(): void {
    this.setNames();
  }

  progress(): void {

  }

  initSlides(): void {
    this.setSlidesPath();
    this.crud.colRefQuery(SLIDES).pipe(
      map(this.crud.mapId)
    ).subscribe(
      {
        next: (slides: any) => {
          this.slides = slides as Slide[];
          this.slideService.slides = this.slides;
          this.loading = false;
        },
        error: (error: any) => console.log(error)
      }
    );
  }

  private setSlidesPath() {
    // reset any previous value to the default
    COURSES.path = 'courses';
    LESSONS.path = 'lessons';
    SLIDES.path = `${COURSES.path}/${this.courseId}/${LESSONS.path}/${this.lessonId}/slides`;
  }

  setNames(): void {
    this.setCourseName();
    this.setLessonName();
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
}

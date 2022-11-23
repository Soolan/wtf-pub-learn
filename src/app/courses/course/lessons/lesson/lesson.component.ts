import {Component, HostListener, OnInit} from '@angular/core';
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
  isLandscape = window.matchMedia("(orientation: landscape)");

  constructor(
    private crud: CrudService,
    private route: ActivatedRoute,
    private navigate: NavigateService,
    private slideService: SlideService,
    private currentService: CurrentService,
    private headerFooter: ToggleHeaderFooterService
  ) {
    headerFooter.toggle(false, true);   // switch off header
    headerFooter.toggle(false, false);  // switch off footer
    this.courseId = this.route.snapshot.paramMap.get('courseId') || '';
    this.lessonId = this.route.snapshot.paramMap.get('lessonId') || '';
    if (this.courseId && this.lessonId) {
      this.initSlides();
      const current = {...this.currentService.current.value};
      current.courseId = this.courseId;
      current.lessonId = this.lessonId;
      this.currentService.next(current);
    } else {
      // ToDo: show a dialog
      console.log('lesson not found!');
    }
    this.isLandscape.addEventListener("change", _ => {
      console.log("landscape orientation", this.isLandscape.matches);
    });
  }

  ngOnInit(): void {
    this.setNames();
    // this.isLandscape = window.innerWidth > window.innerHeight;
    // console.log(window.innerWidth, window.innerHeight, this.isLandscape)
  }

  // @HostListener('window:orientationchange', ['$event'])
  // onOrientationChange() {
  //   this.isLandscape = window.innerWidth > window.innerHeight;
  //   console.log(window.innerWidth, window.innerHeight, this.isLandscape)
  // }

  initSlides(): void {
    const query = {...SLIDES};
    query.path = `${COURSES.path}/${this.courseId}/${LESSONS.path}/${this.lessonId}/slides`;

    this.crud.colRefQuery(query).pipe(
      map(this.crud.mapId)
    ).subscribe(
      {
        next: (slides: any) => {
          this.slides = slides as Slide[];
          this.slideService.slides = this.slides;

          const current = {...this.currentService.current.value};
          current.points = 100/this.slides.length;
          this.currentService.current.next(current);
          this.loading = false;
        },
        error: (error: any) => console.log(error)
      }
    );
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

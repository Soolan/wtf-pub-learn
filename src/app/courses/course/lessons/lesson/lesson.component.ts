import {Component, OnInit} from '@angular/core';
import {LEVELS} from '../../../../shared/data/generic';
import {CrudService} from '../../../../shared/services/crud.service';
import {ToggleHeaderFooterService} from '../../../../shared/services/toggle-header-footer.service';
import {COURSES, LESSONS, P_COURSES, P_LESSONS, PROFILES, SLIDES} from '../../../../shared/data/collections';
import {SlideService} from './slides-renderer/slide.service';
import {CurrentService} from '../../../../shared/services/current.service';
import {NavigateService} from '../../../../shared/services/navigate.service';
import {ActivatedRoute} from '@angular/router';
import {Slide} from '../../../../shared/models/slide';
import {map} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {Lesson} from '../../../../shared/models/profile';

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
  slides!: any[];
  loading = true;
  levels = LEVELS;
  order!: number;
  isLandscape = window.matchMedia("(orientation: landscape)");

  constructor(
    private crud: CrudService,
    public auth: AngularFireAuth,
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
    this.auth.authState.subscribe({
      next: user => {
        const uid = user?.uid;
        if (uid) {
          const path = `${PROFILES.path}/${uid}/${P_COURSES.path}/${this.courseId}/${P_LESSONS.path}`;
          this.crud.docRef(path, this.lessonId).get()
            .then(snap => this.setMarkers(snap.data()))
            .catch();
        }
      },
      error: err => console.log(err)
    });
  }

  initSlides(): void {
    this.crud.colRef(`${COURSES.path}/${this.courseId}/${LESSONS.path}/${this.lessonId}/slides`).get()
      .then(snap => {
        this.slides = snap.docs.map(doc => doc.data());
        this.slides.sort((a, b) => {
          return a.order - b.order
        });
        this.slideService.slides = this.slides;
        this.loading = false;
      })
      .catch()
    ;
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
      .then(lesson => {
        this.lesson = lesson.data().name;
        this.order = lesson.data().order;
      })
      .catch(error => console.log(error))
    ;
  }

  setMarkers(lesson: Lesson): void {
    const current = {...this.currentService.current.value};
    current.lesson = lesson;
    current.points = 100/this.slides.length;
    this.currentService.current.next(current);
  }
}

import { Component, OnInit } from '@angular/core';
import {LEVELS} from '../../../../shared/data/generic';
import {ActivatedRoute, Router} from '@angular/router';
import {CrudService} from '../../../../shared/services/crud.service';
import {ToggleHeaderFooterService} from '../../../../shared/services/toggle-header-footer.service';
import {COURSES, LESSONS, SLIDES} from '../../../../shared/data/collections';
import {map} from 'rxjs';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss']
})
export class LessonComponent implements OnInit {
  courseId!: string;
  lessonId!: string;
  slides!: any;
  loading = true;
  levels = LEVELS;

  constructor(
    private router: Router,
    private crud: CrudService,
    private route: ActivatedRoute,
    private toggle: ToggleHeaderFooterService
  ) {
    toggle.toggle(false, true);   // switch off header
    toggle.toggle(false, false);  // switch off footer
    this.courseId = this.route.snapshot.paramMap.get('courseId') || '';
    this.lessonId = this.route.snapshot.paramMap.get('lessonId') || '';
  }

  ngOnInit(): void {
    if (this.courseId && this.lessonId) {
      SLIDES.path = `${COURSES.path}/${this.courseId}/${LESSONS.path}/${this.lessonId}/slides`;
      this.initSlides();
    } else {
      // ToDo: show a dialog
      console.log('lesson not found!');
    }
  }

  initSlides(): void {
    this.crud.colRefQuery(SLIDES).pipe(
      map(this.crud.mapId),
    ).subscribe(
      {
        next: slides => {
          this.slides = slides;
          this.loading = false;
        },
        error: error => console.log(error)
      }
    );
  }
}

import {Component, Input, OnInit} from '@angular/core';
import {FINAL_EXAM_ID, LEVELS} from '../../../../shared/data/generic';
import {CrudService} from '../../../../shared/services/crud.service';
import {ToggleHeaderFooterService} from '../../../../shared/services/toggle-header-footer.service';
import {COURSES, LESSONS, P_COURSES, P_LESSONS, PROFILES} from '../../../../shared/data/collections';
import {SlideService} from './slides-renderer/slide.service';
import {CurrentService} from '../../../../shared/services/current.service';
import {NavigateService} from '../../../../shared/services/navigate.service';
import {ActivatedRoute} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {Lesson} from '../../../../shared/models/profile';
import {ExamResult, ExamService} from './slides-renderer/exam.service';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss']
})
export class LessonComponent implements OnInit {
  @Input() passingGrade?: number;
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
    private examService: ExamService,
    private navigate: NavigateService,
    private slideService: SlideService,
    private currentService: CurrentService,
    private headerFooter: ToggleHeaderFooterService
  ) {
    headerFooter.toggle(false, true);   // switch off header
    headerFooter.toggle(false, false);  // switch off footer
    this.isLandscape.addEventListener("change", _ => {
      console.log("landscape orientation", this.isLandscape.matches);
    });
  }

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('courseId') || '';
    this.lessonId = this.passingGrade ? FINAL_EXAM_ID : (this.route.snapshot.paramMap.get('lessonId') || '');
    if (this.courseId && this.lessonId) {
      this.initSlides();
    } else {
      // ToDo: show a dialog
      console.log('lesson not found!');
    }
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
        if (this.passingGrade) {
          this.slides = [];
          const count = 5;
          let slides = snap.docs.map(doc => {
            return {...doc.data()}
          });

          slides.sort((a, b) => {
            return a.order - b.order
          });
          this.slides.push(slides.shift());
          const summary = slides.pop();
          slides.sort(() => Math.random() - 0.5); // shuffle

          const questions = slides.slice(1,7); //
          console.log(questions);

          this.slides = this.slides.concat(questions);
          this.slides.push(summary);
          this.initExamResults(questions);

        } else {
          this.slides = snap.docs.map(doc => {
            return {id: doc.id, ...doc.data()}
          });
          this.slides.sort((a, b) => {
            return a.order - b.order
          });
        }
        this.slideService.slides = this.slides;
        this.loading = false;
      })
      .catch()
    ;
  }

  initExamResults(slides: any[]): void {
    const results: ExamResult[] = [];
    slides.forEach(slide => {
        const data = slide.content;
        results.push({
          question: data.question,
          options: data.options,
          answers: data.answers ? data.answers.map((item: any) => item.answer) : [data.answer],
          answered: []
      })
    });
    console.log(results);
    console.log(this.slides);

    this.examService.next(results);
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
    current.points = 100 / this.slides.length;
    this.currentService.current.next(current);
  }
}

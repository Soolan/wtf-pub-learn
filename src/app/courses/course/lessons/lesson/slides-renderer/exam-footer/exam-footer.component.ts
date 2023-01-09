import {Component, Input, OnInit} from '@angular/core';
import {SlideHeaderFooter} from '../../../../../../shared/models/slide';
import {Lesson} from '../../../../../../shared/models/profile';
import {CrudService} from '../../../../../../shared/services/crud.service';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {SlideService} from '../slide.service';
import {P_COURSES, P_LESSONS, PROFILES} from '../../../../../../shared/data/collections';
import {SlideType, Status} from '../../../../../../shared/data/enums';
import {ACTIONS} from '../../../../../../shared/data/generic';
import {DocumentReference} from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-exam-footer',
  templateUrl: './exam-footer.component.html',
  styleUrls: ['./exam-footer.component.scss']
})
export class ExamFooterComponent implements OnInit {
  @Input() courseId!: any;
  @Input() lessonId!: any;
  @Input() totalSlides!: number;
  @Input() order!: number;
  width = 0;
  firstSlide = false;
  lastSlide = false;
  staticSlide = false;
  ui!: SlideHeaderFooter;
  userId!: string | undefined;

  lessonRef!: DocumentReference;
  lessonProgress!: Lesson;
  lessonPath!: string;

  courseRef!: DocumentReference;
  coursePath!: string;

  constructor(
    private crud: CrudService,
    private auth: AngularFireAuth,
    public slideService: SlideService,
  ) {
    this.auth.currentUser
      .then(user => {
        this.userId = user?.uid;
        if (this.userId) {
          this.coursePath = `${PROFILES.path}/${this.userId}/${P_COURSES.path}`;
          this.lessonPath = `${this.coursePath}/${this.courseId}/${P_LESSONS.path}`;
          this.lessonRef = this.crud.docRef(this.lessonPath, this.lessonId);
          this.lessonRef.get().then(snap => this.lessonProgress = snap.data() as Lesson).catch();
        }
      })
      .catch()
    ;
  }

  ngOnInit(): void {
    this.slideService.ui.subscribe({
      next: data => {
        this.ui = data;
        this.initSlideType(data.marker);
      },
      error: error => console.log(error)
    });
  }

  initSlideType(marker: number): void {
    this.firstSlide = marker === SlideType.Start;
    this.lastSlide = this.slideService.slides[marker].type === SlideType.Summary;
    this.staticSlide = this.slideService.slides[marker].type === SlideType.Static;
  }

  move(forward: boolean): void {
    const index = forward ? this.ui.marker + 1 : this.ui.marker - 1;
    const action = ACTIONS[this.slideService.slides[index].type];
    this.slideService.next({marker: index, action, response: '', correct: false, completed: false});
  }
}

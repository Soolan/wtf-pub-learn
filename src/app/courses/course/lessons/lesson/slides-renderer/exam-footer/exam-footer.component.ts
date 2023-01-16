import {Component, Input, OnInit} from '@angular/core';
import {SlideHeaderFooter} from '../../../../../../shared/models/slide';
import {Lesson} from '../../../../../../shared/models/profile';
import {CrudService} from '../../../../../../shared/services/crud.service';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {SlideService} from '../slide.service';
import {P_COURSES, P_LESSONS, PROFILES} from '../../../../../../shared/data/collections';
import {SlideType} from '../../../../../../shared/data/enums';
import {ACTIONS} from '../../../../../../shared/data/generic';
import {DocumentReference} from '@angular/fire/compat/firestore';
import {CurrentService} from '../../../../../../shared/services/current.service';

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
  ui!: SlideHeaderFooter;
  userId!: string | undefined;
  examProgress!: Lesson;

  constructor(
    private crud: CrudService,
    private auth: AngularFireAuth,
    public slideService: SlideService,
    private currentService: CurrentService
  ) {
    this.auth.currentUser
      .then(user => this.userId = user?.uid)
      .catch()
    ;
  }

  ngOnInit(): void {
    this.slideService.ui.subscribe({
      next: data => {
        this.ui = data;
        this.initSlideType(data.marker);
        console.log(this.currentService.current.value)
      },
      error: error => console.log(error)
    });
  }

  initSlideType(marker: number): void {
    this.firstSlide = marker === SlideType.Start;
    this.lastSlide = this.slideService.slides[marker].type === SlideType.Summary;
  }

  move(forward: boolean): void {
    const slideType = this.slideService.slides[this.ui.marker].type
    const index = forward ? this.ui.marker + 1 : this.ui.marker - 1;
    const action = ACTIONS[this.slideService.slides[index].type];
    this.slideService.next({
      marker: index,
      action,
      response: '',
      correct: false,
      completed: false,
      reload: slideType === this.slideService.slides[index].type
    });
  }
}

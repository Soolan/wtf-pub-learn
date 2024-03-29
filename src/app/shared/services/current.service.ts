import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Course, FinalExam, Info, Lesson} from '../models/profile';
import {Status} from '../data/enums';

export interface Current {
  courseId: string;
  course: Course;
  lessonId: string;
  lesson: Lesson;
  points: number;
  reload?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CurrentService {
  current: BehaviorSubject<Current>;
  info: Info = {
    status: Status.Start,
    score: 100,
    updated_at: Date.now()
  };

  finalExam: FinalExam = {
    timestamp: 0,
    grade: 0,
    certId: '',
    nftAddress: ''
  };

  constructor() {
    this.current = new BehaviorSubject<Current>({
      courseId: '',
      course: {name: '', info: this.info, finalExam: this.finalExam},
      lessonId: '',
      lesson: {name: '', current_slide: 1, info: this.info},
      points: 0,
    })
  };

  next(snapshot: Current): void {
    this.current.next(snapshot);
  }

  reset(): void {
    const current: Current = {
      courseId: '',
      course: {name: '', info: this.info, finalExam: this.finalExam},
      lessonId: '',
      lesson: {name: '', current_slide: 1, info: this.info},
      points: 0,
    }
    this.current.next(current);
  }
}

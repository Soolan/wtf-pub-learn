import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

export interface Current {
  courseId: string;
  course: string;
  lessonId: string;
  lesson: string;
}

@Injectable({
  providedIn: 'root'
})
export class CurrentService {
  current: BehaviorSubject<Current>;
  score: BehaviorSubject<number>;

  constructor() {
    this.score = new BehaviorSubject<number>(0);
    this.current = new BehaviorSubject<Current>({
      courseId: '',
      course: '',
      lessonId: '',
      lesson: ''
    });
  }

  next(snapshot: Current): void {
    this.current.next(snapshot);
  }

  nextScore(snapshot: number): void {
    this.score.next(snapshot);
  }
}

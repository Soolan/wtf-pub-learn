import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

export interface Current {
  courseId: string;
  course: string;
  lessonId: string;
  lesson: string;
  points: number;
  score: number;
}

@Injectable({
  providedIn: 'root'
})
export class CurrentService {
  current: BehaviorSubject<Current>;

  constructor() {
    this.current = new BehaviorSubject<Current>({
      courseId: '',
      course: '',
      lessonId: '',
      lesson: '',
      points: 0,
      score: 100
    });
  }

  next(snapshot: Current): void {
    this.current.next(snapshot);
  }
}

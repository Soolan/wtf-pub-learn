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

  constructor() {
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
}

import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Info} from '../models/profile';
import {Status} from '../data/enums';

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
  info: BehaviorSubject<Info>;

  constructor() {
    this.info = new BehaviorSubject<Info>({
      status: Status.Resume,
      score: 0,
      updated_at: Date.now()
    });
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

  nextInfo(snapshot: Info): void {
    this.info.next(snapshot);
  }
}

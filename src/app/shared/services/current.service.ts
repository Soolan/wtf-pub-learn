import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Info, Lesson} from '../models/profile';
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
  points!: BehaviorSubject<number>;
  progress!: BehaviorSubject<Lesson>;

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
    this.points = new BehaviorSubject<number>(0);
    this.progress = new BehaviorSubject<Lesson>({
      name: '',
      current_slide: 0,
      slide_id: '',
      info: {
        status: Status.Start,
        score: 0,
        updated_at: Date.now()
      }
    });
  }

  next(snapshot: Current): void {
    this.current.next(snapshot);
  }

  nextInfo(snapshot: Info): void {
    this.info.next(snapshot);
  }

  nextPoints(snapshot: number): void {
    this.points.next(snapshot);
  }

  nextProgress(snapshot: Lesson): void {
    this.progress.next(snapshot);
  }
}

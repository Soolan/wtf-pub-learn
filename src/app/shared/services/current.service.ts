import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Course, Info, Lesson} from '../models/profile';
import {Status} from '../data/enums';

export interface Current {
  courseId: string;
  course: Course;
  lessonId: string;
  lesson: Lesson;
  points: number;
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
  }
  constructor() {
    this.current = new BehaviorSubject<Current>({
      courseId: '',
      course: {name: '', info: this.info},
      lessonId: '',
      lesson:   {name: '', current_slide: 1,  slide_id: '', info: this.info},
      points: 0,
    });
  }

  next(snapshot: Current): void {
    this.current.next(snapshot);
  }
}

import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

export interface Current {
  course: string;
  lesson: string;
}

@Injectable({
  providedIn: 'root'
})
export class CurrentService {
  current: BehaviorSubject<Current>;

  constructor() {
    this.current = new BehaviorSubject<Current>({
      course: '',
      lesson: ''
    });
  }

  next(snapshot: Current): void {
    this.current.next(snapshot);
  }
}

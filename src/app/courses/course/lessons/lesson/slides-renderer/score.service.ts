import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  points!: BehaviorSubject<number>;

  constructor() {
    this.points = new BehaviorSubject<number>(0);
  }

  next(snapshot: number): void {
    this.points.next(snapshot);
  }
}

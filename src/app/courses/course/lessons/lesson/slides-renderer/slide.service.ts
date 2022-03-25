import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Slide, SlideHeaderFooter} from '../../../../../shared/models/slide';
import {ACTIONS} from '../../../../../shared/data/generic';

@Injectable({
  providedIn: 'root'
})
export class SlideService {
  ui: BehaviorSubject<SlideHeaderFooter>;
  slides!: Slide[];

  constructor() {
    this.ui = new BehaviorSubject<SlideHeaderFooter>({
      marker: 0,
      action: ACTIONS[0],
      response: ''
    });
  }

  next(snapshot: SlideHeaderFooter): void {
    this.ui.next(snapshot);
  }
}

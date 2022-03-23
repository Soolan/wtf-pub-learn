import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {SlideHeaderFooter} from '../../../../../shared/models/slide';

@Injectable({
  providedIn: 'root'
})
export class SlideService {
  ui: BehaviorSubject<SlideHeaderFooter>;

  constructor() {
    this.ui = new BehaviorSubject<SlideHeaderFooter>({
      marker: 0,
      action: '',
      response: ''
    });
  }

  next(snapshot: SlideHeaderFooter): void {
    this.ui.next(snapshot);
  }
}

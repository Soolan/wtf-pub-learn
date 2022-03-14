import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToggleHeaderFooterService {
  headerSubject : BehaviorSubject<boolean>;
  footerSubject : BehaviorSubject<boolean>;

  constructor() {
    this.headerSubject = new BehaviorSubject<boolean>(true);
    this.footerSubject = new BehaviorSubject<boolean>(true);
  }

  toggle(snapshot: boolean, header: boolean): void {
    header ?
      this.headerSubject.next(snapshot):
      this.footerSubject.next(snapshot);
  }

}

import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {DenialReason} from '../data/enums';

@Injectable({
  providedIn: 'root'
})
export class DenialReasonService {
  reason: BehaviorSubject<DenialReason>;

  constructor() {
    this.reason = new BehaviorSubject<DenialReason>(DenialReason.SessionExpired);
  }

  next(snapshot: DenialReason): void {
    this.reason.next(snapshot);
  }
}

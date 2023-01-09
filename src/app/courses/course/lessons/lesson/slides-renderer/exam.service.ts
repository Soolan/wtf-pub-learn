import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Info} from '../../../../../shared/models/profile';
import {Status} from '../../../../../shared/data/enums';
import {Current} from '../../../../../shared/services/current.service';

export interface ExamResult {
  question: string;
  options: {
    value: string;
    response: string;
  };
  answers: string[];
  answered: string
}

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  results: BehaviorSubject<ExamResult[]>;

  constructor() {
    this.results = new BehaviorSubject<ExamResult[]>([]);
  }

  next(snapshot: ExamResult[]): void {
    this.results.next(snapshot);
  }
    // {question: '',  options: {value: '', response: ''}, answers: [], answered: ''})
}

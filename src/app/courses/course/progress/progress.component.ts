import {Component, OnInit} from '@angular/core';
import {Status} from '../../../shared/data/enums';
import {STATUSES} from '../../../shared/data/generic';
import {Progress} from '../../../shared/models/course';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit {
  action!: string;
  status = Status;
  userStatus!:number;
  progress!: Progress;
  constructor() { }

  ngOnInit(): void {
    this.progress = {
      status: Status.Retake,
      course_id: 'some course id',
      lesson: 'Lesson 2 - some blah blah bloody blah',
      slide: 4,
      score: 57,
      updated_at: Date.now()
    }
    this.action = STATUSES[this.progress.status];
  }

  get statuses(): string[] {
    return STATUSES;
  }
}

import {Component, Input, OnInit} from '@angular/core';
import {Status} from '../../../shared/data/enums';
import {STATUSES} from '../../../shared/data/generic';
import {SlideService} from '../lessons/lesson/slides-renderer/slide.service';
import {Progress} from '../../../shared/models/profile';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit {
  @Input() courseId!: string;
  action!: string;
  status = Status;
  progress!: Progress;
  constructor() { }

  ngOnInit(): void {

  }

  get statuses(): string[] {
    return STATUSES;
  }
}

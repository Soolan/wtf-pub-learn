import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {SlideService} from '../slide.service';
import {ACTIONS} from '../../../../../../shared/data/generic';
import {SlideType} from '../../../../../../shared/data/enums';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent {
  @Input() slide: any;
  constructor(private slideService: SlideService) { }

  proceed(): void {
    this.slideService.next({
      marker: 1,
      action: ACTIONS[this.slideService.slides[1].type],
      response: '',
      correct: false,
      completed: false
    })
  }
}

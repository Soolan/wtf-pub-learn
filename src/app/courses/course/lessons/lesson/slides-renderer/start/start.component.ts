import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {SlideService} from '../slide.service';
import {ACTIONS} from '../../../../../../shared/data/generic';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnChanges {
  @Input() slide: any;
  constructor(private slideService: SlideService) { }

  ngOnChanges(changes: SimpleChanges) {
    this.slideService.next({marker: 0, action: ACTIONS[0], response: ''})
  }

  proceed(): void {
    this.slideService.next({
      marker: 1,
      action: ACTIONS[this.slideService.slides[1].type],
      response: ''
    })
  }
}

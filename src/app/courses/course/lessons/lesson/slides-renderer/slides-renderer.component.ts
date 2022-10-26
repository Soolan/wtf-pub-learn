import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {SlideType} from '../../../../../shared/data/enums';
import {Slide} from '../../../../../shared/models/slide';
import {SlideService} from './slide.service';

@Component({
  selector: 'app-slides-renderer',
  templateUrl: './slides-renderer.component.html',
  styleUrls: ['./slides-renderer.component.scss']
})
export class SlidesRendererComponent implements OnChanges {
  @Input() slides!: any[];
  index!: number;
  current!: Slide;
  type = 0;
  types = SlideType;

  constructor(private slideService: SlideService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.slideService.ui.subscribe({
      next: data => this.setCurrentSlide(data.marker),
      error: error => console.log(error)
    })
  }

  setCurrentSlide(index: number): void {
    console.log(index)
    this.current = this.slides[index];
    console.log(this.current);
  }
}

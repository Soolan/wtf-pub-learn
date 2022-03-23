import {Component, Input, OnInit} from '@angular/core';
import {SlideType} from '../../../../../shared/data/enums';
import {Slide} from '../../../../../shared/models/slide';
import {SlideService} from './slide.service';

@Component({
  selector: 'app-slides-renderer',
  templateUrl: './slides-renderer.component.html',
  styleUrls: ['./slides-renderer.component.scss']
})
export class SlidesRendererComponent implements OnInit {
  @Input() slides!: any[];
  index!: number;
  currentSlide!: Slide;
  type = 0;
  types = SlideType;

  constructor(private ui: SlideService) { }

  ngOnInit(): void {

  }
}

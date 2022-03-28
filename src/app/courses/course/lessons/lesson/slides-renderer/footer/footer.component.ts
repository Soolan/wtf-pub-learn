import {Component, OnInit} from '@angular/core';
import {SlideService} from '../slide.service';
import {BOUNCE} from '../../../../../../shared/animations/bounce';
import {STRETCH} from '../../../../../../shared/animations/strech';
import {ACTIONS} from '../../../../../../shared/data/generic';
import {SlideHeaderFooter} from '../../../../../../shared/models/slide';
import {SlideType} from '../../../../../../shared/data/enums';

@Component({
  selector: 'app-renderer-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  animations: [BOUNCE, STRETCH]
})
export class FooterComponent implements OnInit {
  response!: string;
  width = 0;
  startSlide = false;
  staticSlide = false;
  hintFillInSlide = false;
  ui!: SlideHeaderFooter;
  constructor(private slideService: SlideService) { }

  ngOnInit(): void {
    this.slideService.ui.subscribe({
      next: data => {
        this.ui = data;
        this.initSlideType(data.marker);
        this.setResponse(data.response);
      },
      error: error => console.log(error)
    });
  }

  initSlideType(marker: number): void {
    this.startSlide = marker === SlideType.Start;
    this.staticSlide = this.slideService.slides[marker].type === SlideType.Static;
    this.hintFillInSlide = this.slideService.slides[marker].type === SlideType.HintFillIn;
  }

  setResponse(response: string): void {
    this.response = '';
    setTimeout( _ => {
      this.response = response;
    }, 200)
  }

  move(forward: boolean): void {
    const index = forward ? this.ui.marker + 1 : this.ui.marker - 1
    this.slideService.next({
      marker: index,
      action: ACTIONS[this.slideService.slides[index].type],
      response: '',
      correct: false,
      completed: false
    })
  }

  hint(): void {
    // @ts-ignore
    const hint = this.slideService.slides[this.slideService.markerIndex].content['hint'];
    this.slideService.next({
      marker: this.ui.marker,
      action: this.ui.action,
      response: hint,
      correct: false,
      completed: false
    })
  }
}

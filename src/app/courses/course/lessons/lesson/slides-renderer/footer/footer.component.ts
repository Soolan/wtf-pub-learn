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
  staticSlide= false;
  ui!: SlideHeaderFooter;
  constructor(private slideService: SlideService) { }

  ngOnInit(): void {
    this.slideService.ui.subscribe({
      next: data => {
        this.ui = data;
        this.setResponse(data.response);
        this.startSlide = data.marker === SlideType.Start;
        this.staticSlide= this.slideService.slides[data.marker].type === SlideType.Static;
      },
      error: error => console.log(error)
    });
  }

  setResponse(response: string): void {
    this.response = '';
    setTimeout( _ => {
      this.response = response;
    }, 200)
  }

  // trigger() {
  //   this.completed = true;
  //   this.correct = true;
  //   this.setResponse('this is a shiny response! this is a shiny response! this is a shiny response! ');
  // }

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
}

import {Component, OnInit} from '@angular/core';
import {SlideService} from '../slide.service';
import {BOUNCE} from '../../../../../../shared/animations/bounce';
import {STRETCH} from '../../../../../../shared/animations/strech';

@Component({
  selector: 'app-renderer-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  animations: [BOUNCE, STRETCH]
})
export class FooterComponent implements OnInit {
  response!: string;
  width = 0;
  completed = false;
  correct = false;
  constructor(private slideService: SlideService) { }

  ngOnInit(): void {
    this.slideService.ui.subscribe({
      next: data => this.setResponse(data.response),
      error: error => console.log(error)
    });
  }

  setResponse(response: string): void {
    this.response = '';
    setTimeout( _ => {
      this.response = response;
    }, 200)
  }

  trigger() {
    this.completed = true;
    this.correct = true;
    this.setResponse('this is a shiny response! this is a shiny response! this is a shiny response! ');
  }
}

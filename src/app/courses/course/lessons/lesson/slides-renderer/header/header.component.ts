import {Component, Input, OnInit} from '@angular/core';
import {SlideService} from '../slide.service';

@Component({
  selector: 'app-renderer-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() count!: number;
  @Input() course!: string;
  @Input() lesson!: string;
  firstRow!: any;
  secondRow = Array(0);
  action!: string;
  currentSlide!: number;
  hover = false;
  constructor(private slideService: SlideService) { }

  ngOnInit(): void {
    this.currentSlide = 9;
    this.slideService.ui.subscribe({
      next: data => {
        // this.currentSlide = data.marker;
        this.action = data.action;
      },
      error: error => console.log(error)
    });
    this.initMarkers();
  }

  initMarkers(): void {
    if (this.count > 2) {
      if (this.count % 2 === 0) {
        this.firstRow = Array(this.count/2);
        this.secondRow = this.firstRow;
        console.log(this.count, this.firstRow, this.secondRow);
      } else {
        this.firstRow = Array(Math.ceil(this.count/2));
        this.secondRow = Array(this.firstRow.length - 1);
        console.log(this.count, this.firstRow, this.secondRow);
      }
    } else {
      console.log('slide count is not correct!', this.count);
    }
  }

  navigate (index: number): void {

  }
}

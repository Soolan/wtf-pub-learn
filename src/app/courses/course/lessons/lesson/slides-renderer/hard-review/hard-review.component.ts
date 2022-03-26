import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-hard-review',
  templateUrl: './hard-review.component.html',
  styleUrls: ['./hard-review.component.scss']
})
export class HardReviewComponent implements OnInit {
  @Input() slide: any;

  constructor() { }

  ngOnInit(): void {
  }

}

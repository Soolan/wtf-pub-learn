import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-easy-review',
  templateUrl: './easy-review.component.html',
  styleUrls: ['./easy-review.component.scss']
})
export class EasyReviewComponent implements OnInit {
  @Input() slide: any;

  constructor() { }

  ngOnInit(): void {
  }

}

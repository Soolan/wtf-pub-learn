import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-mixed-fill-in',
  templateUrl: './mixed-fill-in.component.html',
  styleUrls: ['./mixed-fill-in.component.scss']
})
export class MixedFillInComponent implements OnInit {
  @Input() slide: any;

  constructor() { }

  ngOnInit(): void {
  }

}

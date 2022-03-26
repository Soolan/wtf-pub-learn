import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-hint-fill-in',
  templateUrl: './hint-fill-in.component.html',
  styleUrls: ['./hint-fill-in.component.scss']
})
export class HintFillInComponent implements OnInit {
  @Input() slide: any;

  constructor() { }

  ngOnInit(): void {
  }

}

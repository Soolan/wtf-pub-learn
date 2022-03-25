import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-static',
  templateUrl: './static.component.html',
  styleUrls: ['./static.component.scss']
})
export class StaticComponent implements OnInit {
  @Input() slide: any;

  constructor() { }

  ngOnInit(): void {
  }

}

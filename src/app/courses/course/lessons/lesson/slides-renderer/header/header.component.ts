import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-renderer-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  firstRow = Array(7);
  secondRow = Array(6);
  course = "The Fun Crypto course";
  keyword = "Crypto";
  constructor() { }

  ngOnInit(): void {
  }

}

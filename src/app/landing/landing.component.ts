import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  keyword = "Crypto";
  content = "Learn Crypto The Right Way";
  constructor() { }

  ngOnInit(): void {
  }

}

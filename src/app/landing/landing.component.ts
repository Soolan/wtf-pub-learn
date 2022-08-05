import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  keyword = "Crypto";
  content = "Learn Crypto, the fun way";
  bullets: any = [
    {title: 'bullet 1', description: 'some description', icon: 'icon1'},
    {title: 'bullet 1', description: 'some description', icon: 'icon1'},
    {title: 'bullet 1', description: 'some description', icon: 'icon1'},
    {title: 'bullet 1', description: 'some description', icon: 'icon1'},
  ]
  constructor() { }

  ngOnInit(): void {
  }

}

import {Component, Input, OnInit} from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {
  @Input() lessonsId!: string;
  title = 'Whoops, Connection failed!';
  subTitle = 'Please check your internet connection and try again.';
  button_label = 'refresh';
  button_icon = 'refresh';

  constructor(private location: Location) {
  }

  ngOnInit(): void {
    if (!this.lessonsId) {
      this.title = 'The lesson does not exist.';
      this.subTitle = 'Please choose the lesson from the course page.';
      this.button_label = 'back';
      this.button_icon = 'arrow_back'
    }
  }

  action(): void {
    this.lessonsId ?
      window.location.reload() :
      this.location.back();
  }

}

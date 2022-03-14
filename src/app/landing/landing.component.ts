import { Component, OnInit } from '@angular/core';
import {Course} from '../shared/models/course';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  course!: Course[];
  constructor(private crud: CrudService) { }

  ngOnInit(): void {
  }

}

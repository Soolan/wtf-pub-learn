import { Component, OnInit } from '@angular/core';
import {Course} from '../shared/models/course';
import {CrudService} from '../shared/services/crud.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  courses!: Course[];
  constructor(private crud: CrudService) { }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import {Course} from '../shared/models/course';
import {CrudService} from '../shared/services/crud.service';
import {COURSES} from '../shared/data/collections';
import {map} from 'rxjs';
import {LEVELS, STATUSES} from '../shared/data/generic';
import {Status} from '../shared/data/enums';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  courses!: any;
  action!: string;
  avatar = '_files/1645928114044';
  constructor(private crud: CrudService) { }

  ngOnInit(): void {
    this.action = STATUSES[Status.Start];
    this.crud.colRefQuery(COURSES).pipe(
      map(this.crud.mapId)
    ).subscribe(
      {
        next: courses => this.courses = courses,
        error: error => console.log(error)
      }
    );
  }

  get Levels(): string[] {
    return LEVELS;
  }
}

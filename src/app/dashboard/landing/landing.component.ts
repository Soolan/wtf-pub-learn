import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {CrudService} from '../../shared/services/crud.service';
import {COURSES} from '../../shared/data/collections';
import {map} from 'rxjs';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  completed = 75;
  course!: any;

  constructor(public auth: AngularFireAuth, private crud: CrudService) { }

  ngOnInit(): void {
    let query = COURSES;
    query.limit = 1;
    this.crud.colRefQuery(query).pipe(
      map(this.crud.mapId),
    ).subscribe({
      next: courses => {
        this.course = courses[0];
        console.log(this.course);
      },
      error: error => console.error(error)
    });
  }

}

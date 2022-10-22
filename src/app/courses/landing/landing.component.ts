import {Component, OnInit} from '@angular/core';
import {CrudService} from '../../shared/services/crud.service';
import {COURSES} from '../../shared/data/collections';
import {map} from 'rxjs';
import {LEVELS, STATUSES} from '../../shared/data/generic';
import {Status} from '../../shared/data/enums';
import {Router} from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  courses!: any;
  lessons!: any;
  id!: string;
  action!: string;
  avatar = '_files/1645928114044';

  constructor(private crud: CrudService, private router: Router) { }

  ngOnInit(): void {
    this.action = STATUSES[Status.Start];
    this.crud.colRefQuery(COURSES).pipe(
      map(this.crud.mapId),
    ).subscribe(
      {
        next: courses =>  {
          this.courses = courses;
          console.log(this.courses);
        },
        error: error => console.log(error)
      }
    );
  }

  // get Levels(): string[] {
  //   return LEVELS;
  // }

  navigate(collection: string, id: string): void {
    const path = this.id ? `courses/${this.id}/${collection}` : collection;
    this.router.navigate([path, id])
      .then()
      .catch(error => console.log(error))
    ;
  }
}

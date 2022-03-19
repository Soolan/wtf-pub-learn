import {Component, OnInit} from '@angular/core';
import {CrudService} from '../../shared/services/crud.service';
import {COURSES, LESSONS} from '../../shared/data/collections';
import {map} from 'rxjs';
import {LEVELS, STATUSES} from '../../shared/data/generic';
import {Status} from '../../shared/data/enums';
import {CARD_FLIP} from '../../shared/animations/card-flip';
import {Router} from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  animations: [CARD_FLIP]
})
export class LandingComponent implements OnInit {
  courses!: any;
  lessons!: any;
  id!: string;
  action!: string;
  flipState = 'front'; // front: course side - back: lessons side
  avatar = '_files/1645928114044';

  constructor(private crud: CrudService, private router: Router) { }

  ngOnInit(): void {
    this.action = STATUSES[Status.Start];
    this.crud.colRefQuery(COURSES).pipe(
      map(this.crud.mapId),
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

  flip(id?: string): void {
    if (id) {
      this.id = id;
      this.initLessons(this.id);
      this.flipState = 'back';
    } else {
      this.flipState = 'front';
      this.lessons = undefined;
      this.id = '';
    }
  }

  initLessons(id: string): void {
    LESSONS.path = `${COURSES.path}/${id}/lessons`
    this.crud.colRefQuery(LESSONS).pipe(
      map(this.crud.mapId),
    ).subscribe(
      {
        next: lessons => this.lessons = lessons,
        error: error => console.log(error)
      }
    );
  }

  navigate(collection: string, id: string): void {
    const path = this.id ? `courses/${this.id}/${collection}` : collection;
    this.router.navigate([path, id])
      .then()
      .catch(error => console.log(error))
    ;
  }
}

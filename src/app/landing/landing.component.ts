import {Component, OnInit} from '@angular/core';
import {CrudService} from '../shared/services/crud.service';
import {COURSES, EVENTS} from '../shared/data/collections';
import {map, Observable} from 'rxjs';
import {AngularFireAnalytics} from '@angular/fire/compat/analytics';
import {Router} from '@angular/router';
import {ACTION_LANDING_CLICK} from '../shared/data/analytics-events';
import {EVENTS_RENDER, LANDING, LEVELS} from '../shared/data/generic';
import {Event} from '../shared/models/event';
import {EventType} from '../shared/data/enums';
import {FADE_OUT} from '../shared/animations/fade-out';
import {SLIDE_DOWN} from '../shared/animations/slide-down';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  animations: [FADE_OUT, SLIDE_DOWN]
})
export class LandingComponent implements OnInit {
  landing = LANDING;
  id = "";
  course!: any;
  tags: string[] = [];
  levels = LEVELS;
  stream!: Observable<any[]>;
  events = EVENTS_RENDER;

  constructor(
    private router: Router,
    private crud: CrudService,
    private analytics: AngularFireAnalytics
  ) {}

  ngOnInit(): void {
    this.getLatestCourse();
    this.stream = this.crud.colRefQueryValues(EVENTS);
  }

  private getLatestCourse() {
    const query = {...COURSES};  // make a copy to prevent altering thr original values
    query.limit = 1;
    this.crud.colRefQuery(query).pipe(
      map(this.crud.mapId),
    ).subscribe({
      next: courses => {
        this.course = courses[0];
      },
      error: error => console.error(error)
    });
  }

  navigate(destination: string): void {
    this.analytics.logEvent(ACTION_LANDING_CLICK, {component: 'body', button: destination}).then().catch();
    if (destination === 'courses') {
      this.router.navigate([destination]).then().catch();
    } else {
      window.location.href = destination;
    }
  }

  gen(): void {
    this.crud.add('events', {
      type: Math.floor(Math.random() * 15), // 0 - 14
      who: Math.random().toString(36).slice(2, 4) + '****@gmail.com',
      created_at: Date.now()
    }).then().catch();
  }
}

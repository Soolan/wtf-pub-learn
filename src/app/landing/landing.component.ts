import {Component, OnInit} from '@angular/core';
import {CrudService} from '../shared/services/crud.service';
import {COURSES} from '../shared/data/collections';
import {map} from 'rxjs';
import {AngularFireAnalytics} from '@angular/fire/compat/analytics';
import {Router} from '@angular/router';
import {ACTION_LANDING_CLICK} from '../shared/data/analytics-events';
import {LANDING} from '../shared/data/generic';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  landing = LANDING;
  id = "";
  course!: any;

  constructor(
    private router: Router,
    private crud: CrudService,
    private analytics: AngularFireAnalytics
  ) {}

  ngOnInit(): void {
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
}

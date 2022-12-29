import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {CrudService} from '../../shared/services/crud.service';
import {COURSES, PROFILES} from '../../shared/data/collections';
import {map} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {Profile} from '../../shared/models/profile';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  completed = 20;
  course!: any;
  profile!: Profile;
  profileId!: string;
  progress: any = {
    active: 'ikYNdVWtUKQ6cyH2fbvT',
    previous: [],
    bookmarks: []
  }
  constructor(
    private crud: CrudService,
    public auth: AngularFireAuth,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.profileId = this.route.snapshot.paramMap.get('profileId') || '';
    if (this.profileId) {
      this.initProfile();
      this.initCourses();
    }
  }

  initProfile(): void {
    this.crud.docRef(PROFILES.path, this.profileId).get()
      .then(snapShot => {
        this.profile = snapShot.data();
        this.completed += this.profile.avatar ? 20 : 0;
        this.completed += this.profile.firstname ? 20 : 0;
        this.completed += this.profile.lastname ? 20 : 0;
        this.completed += this.profile.display_name ? 20 : 0;
      })
      .catch()
    ;
  }

  initCourses(): void {
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

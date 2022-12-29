import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {CrudService} from '../../shared/services/crud.service';
import {COURSES, P_COURSES, PROFILES} from '../../shared/data/collections';
import {map} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {Profile} from '../../shared/models/profile';
import {CurrentService} from '../../shared/services/current.service';
import {Status} from '../../shared/data/enums';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  currentCourses!: any[];
  completedCourses!: any[];
  profile!: Profile;
  profileId!: string;
  completedProfile = 25;

  constructor(
    private crud: CrudService,
    public auth: AngularFireAuth,
    private route: ActivatedRoute,
    private current: CurrentService
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
        this.completedProfile += this.profile.avatar ? 25 : 0;
        this.completedProfile += this.profile.firstname ? 15 : 0;
        this.completedProfile += this.profile.lastname ? 15 : 0;
        this.completedProfile += this.profile.display_name ? 20 : 0;
      })
      .catch()
    ;
  }

  initCourses(): void {
    let query = {...P_COURSES};
    query.limit = 50;
    query.orderBy =  {field: 'course.inf.updated_at', direction: 'desc'};
    this.crud.colRefQuery(query).pipe(
      map(this.crud.mapId),
    ).subscribe({
      next: courses => courses.forEach((course: any) => {
        course.info.status === Status.Retake ?
          this.completedCourses.push(course) :
          this.currentCourses.push(course);
      }),
      error: error => console.error(error)
    });
  }
}

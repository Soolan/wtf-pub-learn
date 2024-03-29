import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {CrudService} from '../../shared/services/crud.service';
import {COURSES, P_COURSES, PROFILES} from '../../shared/data/collections';
import {map} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {Profile} from '../../shared/models/profile';
import {CurrentService} from '../../shared/services/current.service';
import {Status} from '../../shared/data/enums';
import {Collection} from '../../shared/models/collection';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  courses: any[] = [];
  course!: any;
  currentCourses: any[] = [];
  completedCourses: any[] = [];
  profile!: Profile;
  profileId!: string;
  completedProfile = 25;

  constructor(
    private router: Router,
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
    let query: Collection = {
      path: `profiles/${this.profileId}/courses`,
      limit: 50,
      where: {field: 'info.updated_at', operator: '!=', value: 0},
      orderBy:  {field: 'info.updated_at', direction: 'desc'}
    };
    this.crud.colRefQuery(query).pipe(
      map(this.crud.mapId),
    ).subscribe({
      next: courses => {
        this.courses = courses;
        this.getStats();
      },
      error: error => console.error(error)
    });
  }

  getStats(): void {
    this.courses.forEach((course: any) => {
      course.info.status === Status.Retake ?
        this.completedCourses.push(course) :
        this.currentCourses.push(course);
    });
    this.course = this.currentCourses.shift();
  }

  navigate(id: string): void {
    this.router.navigate(['courses', id]).then().catch();
  }

  verify(id: string): void {
    this.router.navigate(
      ['verify', id.slice(0,7)],
      {queryParams: {user: this.profileId.slice(0,7)}}
    ).then().catch();
  }
}

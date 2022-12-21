import {Component, OnInit} from '@angular/core';
import {Release} from '../shared/models/release';
import {CrudService} from '../shared/services/crud.service';
import {RELEASES} from '../shared/data/collections';
import {map} from 'rxjs';

import firebase from 'firebase/compat/app';
import Timestamp = firebase.firestore.Timestamp;
import {WtfProduct} from '../shared/data/enums';

export interface Quarter {
  quarter: string;
  items: string[];
}

@Component({
  selector: 'app-releases',
  templateUrl: './releases.component.html',
  styleUrls: ['./releases.component.scss']
})
export class ReleasesComponent implements OnInit {
  releases: Release[] = [];
  roadmaps: Release[] = [];
  quarters!: Quarter[];

  constructor(private crud: CrudService) {
  }

  ngOnInit(): void {
    this.initReleases();
    this.initQuarters();
  }

  private initReleases() {
    this.crud.colRefQuery(RELEASES).pipe(
      map(this.crud.mapId),
    ).subscribe({
      next: releases => {
        this.releases = [];
        releases.forEach((release: Release) => {
          if (release.date <= Timestamp.now()) this.releases.push(release);
        });
      },
      error: error => console.log(error)
    });
  }

  initQuarters(): void {
    const query = {...RELEASES}; // make a copy to prevent altering thr original values
    query.where = {field: 'date', operator: '>', value: Timestamp.now()}
    this.roadmaps = [];
    this.quarters = [];
    this.crud.colRefQuery(query).pipe(
      map(this.crud.mapId),
    ).subscribe({
      next: roadmaps => {
        roadmaps.forEach((roadmap: Release) => this.roadmaps.push(roadmap));
        this.setQuarters();
      },
      error: error => console.log(error)
    });
  }

  setQuarters(): void {
    let quarter: string;
    // this.sortRoadmaps();
    this.roadmaps.forEach(r => {
      quarter = this.getQuarter(r.date);
      if (this.quarters.length === 0) {
        this.quarters.push({quarter: quarter, items: this.aggregate(r)});
      } else {
        const entry = this.quarters.find(item => item.quarter === quarter);
        if (entry) {
          entry.items = this.aggregate(r, entry.items)
        } else {
          this.quarters.push({quarter: quarter, items: this.aggregate(r)})
        }
      }
    })
  }

  getQuarter(date: Timestamp): string {
    const quarter = Math.floor(date.toDate().getMonth() / 3 + 1);
    const year = new Date(date.toDate()).getFullYear();
    return `Q${quarter}, ${year}`;
  }

  aggregate(release: Release, qItems?: string[]): string[] {
    let items = release.features
      .concat(release.improvements)
      .concat(release.fixes)
      .concat(release.operations);
    if (qItems) items = items.concat(qItems);
    return items;
  }

  sortRoadmaps(): void {
    this.roadmaps.sort((a,b) => {
      return a.date.seconds - b.date.seconds;
    });
  }
}

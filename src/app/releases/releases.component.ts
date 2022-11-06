import { Component, OnInit } from '@angular/core';
import {Release} from '../shared/models/release';
import {CrudService} from '../shared/services/crud.service';
import {RELEASES} from '../shared/data/collections';
import {map} from 'rxjs';

import firebase from 'firebase/compat/app';
import Timestamp = firebase.firestore.Timestamp;

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
  constructor(private crud: CrudService) { }

  ngOnInit(): void {
    this.crud.colRefQuery(RELEASES).pipe(
      map(this.crud.mapId),
    ).subscribe(
      {
        next: releases => {
          releases.forEach((release: Release)  => {
            (release.date > Timestamp.now()) ?
              this.roadmaps.push(release):
              this.releases.push(release);
          })
        },
        error: error => console.log(error)
      }
    );
  }
}

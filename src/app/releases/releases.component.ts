import { Component, OnInit } from '@angular/core';
import {RELEASES} from '../shared/data/releases';
import {Release} from '../shared/models/release';

@Component({
  selector: 'app-releases',
  templateUrl: './releases.component.html',
  styleUrls: ['./releases.component.scss']
})
export class ReleasesComponent implements OnInit {
  releases: Release[] = [];
  roadmaps: Release[] = [];
  constructor() { }

  ngOnInit(): void {
    // console.log(new Date(this.releases[0].date));
    RELEASES.forEach(release => {
      (new Date(release.date) > new Date()) ?
        this.roadmaps.push(release):
        this.releases.push(release);
    })
  }
}

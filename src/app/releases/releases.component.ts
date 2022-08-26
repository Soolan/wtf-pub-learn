import { Component, OnInit } from '@angular/core';
import {RELEASES} from '../shared/data/releases';

@Component({
  selector: 'app-releases',
  templateUrl: './releases.component.html',
  styleUrls: ['./releases.component.scss']
})
export class ReleasesComponent implements OnInit {
  releases = RELEASES;
  constructor() { }

  ngOnInit(): void {
  }

}

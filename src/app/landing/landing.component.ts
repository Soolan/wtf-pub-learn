import { Component, OnInit } from '@angular/core';
import {CrudService} from '../shared/services/crud.service';
import {COURSES} from '../shared/data/collections';
import {map, shareReplay} from 'rxjs';
import {Course} from '../shared/models/course';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  keyword = "Crypto";
  content = "Learn Crypto, the fun way";
  id= "";
  course!: any;
  bullets: any = [
    {title: 'Blockchain', description: 'All you can learn!', icon: 'logo-blt.png'},
    {title: 'LOOR', description: 'Financial freedom', icon: 'loor-character.png'},
    {title: 'Free WTF', description: 'Show me the money!', icon: 'logo-branding.png'},
    {title: 'Marketplace', description: 'Authentic NFTs', icon: 'logo-grey-white-glow.png'},
  ]
  constructor(private crud: CrudService) { }

  ngOnInit(): void {
    let query = COURSES;
    query.limit = 1;
    this.crud.colRefQuery(query).pipe(
      map(this.crud.mapId),
      // shareReplay(1),
    ).subscribe(
      {
        next: courses => {
          this.course = courses[0];
          console.log(this.course);
        },
        error: error => console.log(error)
      }
    );
  }
}

import {Component, HostListener, OnInit} from '@angular/core';
import {CrudService} from '../shared/services/crud.service';
import {COURSES} from '../shared/data/collections';
import {map} from 'rxjs';
import {ContentKeyword} from '../shared/models/content-keyword';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  heading: ContentKeyword = {
    content: "Learn Crypto, the fun way",
    keyword: "Crypto"
  }
  description: ContentKeyword[] = [
    {
      content: "Understand the crypto buzzwords, ",
      keyword: "crypto"
    },
    {
      content: "in a playful way, ",
      keyword: "playful"
    },
    {
      content: "one course at a time.",
      keyword: "course"
    },
  ];
  id= "";
  course!: any;
  bullets: any = [
    {title: 'Blockchain', description: 'All you can learn!', icon: 'logo-blt.png'},
    {title: 'LOOR', description: 'Financial freedom game', icon: 'loor-character.png'},
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

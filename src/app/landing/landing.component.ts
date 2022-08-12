import {Component, HostListener, OnInit} from '@angular/core';
import {CrudService} from '../shared/services/crud.service';
import {COURSES} from '../shared/data/collections';
import {map} from 'rxjs';
import {ContentKeyword} from '../shared/models/content-keyword';
import {AngularFireAnalytics} from '@angular/fire/compat/analytics';
import {Router} from '@angular/router';
import {ACTION_LANDING_CLICK} from '../shared/data/analytics-events';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  heading: ContentKeyword = {
    content: "Crypto,",
    keyword: "Crypto"
  }
  subheading = "the fun way.";
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
    {title: 'Blockchain', description: 'All you can learn!', icon: 'logo-blt.png', navigate: 'courses'},
    {title: 'LOOR', description: 'Financial freedom game', icon: 'loor-character.png', navigate: 'https://loor'},
    {title: 'Free WTF', description: 'Show me the money!', icon: 'logo-branding.png', navigate: 'https://faucet'},
    {title: 'Marketplace', description: 'Authentic NFTs', icon: 'logo-grey-white-glow.png', navigate: 'https://nft'},
  ]

  constructor(
    private router: Router,
    private crud: CrudService,
    private analytics: AngularFireAnalytics
  ) { }

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

  navigate(destination: string): void {
    this.analytics.logEvent(ACTION_LANDING_CLICK, {component: 'body', button: destination}).then().catch();

    if (destination === 'courses') {
        this.router.navigate([destination]).then().catch();
    } else {
      window.location.href = destination;
    }
  }
}

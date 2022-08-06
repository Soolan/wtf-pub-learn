import { Component, OnInit } from '@angular/core';
import {SOCIALS} from '../../data/socials';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  socials = SOCIALS;

  constructor() { }
  ngOnInit(): void { }

  navigate(label: string): void {
    const url = this.socials.find(s => s.label.toLowerCase() === label)?.url;
    window.open(url, '_blank');
  }
}

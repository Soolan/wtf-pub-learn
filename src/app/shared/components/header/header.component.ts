import {Component, HostListener, OnInit, ViewEncapsulation} from '@angular/core';
import {PRODUCTS, PROFILE} from '../../data/navigation';
import {Option} from '../../models/navigation';
import {ThemePalette} from '@angular/material/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {
  login = false;
  products!: string[];
  profile!: Option[];
  color!: ThemePalette;

  constructor() {}

  ngOnInit(): void {
    this.products = PRODUCTS;
    this.profile = PROFILE;
    if (this.login) {
      this.profile.splice(0,1, {icon: 'logout', label: 'Logout'}); // delete & replace in one go
    }
  }

  @HostListener('window:scroll', ['$event'])

  onWindowScroll() {
    let element = document.querySelector('.full-width') as HTMLElement;
    if (window.scrollY > element.clientHeight) {
      element.classList.add('inverse');
      this.color = "primary";
    } else {
      element.classList.remove('inverse');
      this.color = undefined;
    }
  }
}

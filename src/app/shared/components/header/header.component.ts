import { Component, OnInit } from '@angular/core';
import {PRODUCTS, PROFILE} from '../../data/navigation';
import {Option} from '../../models/navigation';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  login = false;
  products!: string[];
  profile!: Option[];

  constructor() {}

  ngOnInit(): void {
    this.products = PRODUCTS;
    this.profile = PROFILE;
    if (this.login) {
      this.profile.splice(0,1, {icon: 'logout', label: 'Logout'}); // delete & replace in one go
    }
  }
}

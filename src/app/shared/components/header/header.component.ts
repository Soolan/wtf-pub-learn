import {Component, HostListener, OnInit, ViewEncapsulation} from '@angular/core';
import {DIALOG_DELAY, PRODUCTS, PROFILE} from '../../data/navigation';
import {Option} from '../../models/navigation';
import {ThemePalette} from '@angular/material/core';
import {AuthenticationComponent} from '../dialogs/authentication/authentication.component';
import {WalletComponent} from '../dialogs/wallet/wallet.component';
import {NotificationsComponent} from '../dialogs/notifications/notifications.component';
import {MatDialog} from '@angular/material/dialog';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {
  login = false;
  products!: Option[];
  profile!: Option[];
  color!: ThemePalette;

  constructor(
    public auth: AngularFireAuth,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.products = PRODUCTS;
    this.profile = PROFILE;
  }

  exit(): void {
    this.router.navigate(['courses']).then().catch();
  }

  openDialog(name: string, uid?: string): void {
    switch (name) {
      case "login":
        this.dialog.open(AuthenticationComponent, {
          width: '350px',
          enterAnimationDuration: DIALOG_DELAY,
          exitAnimationDuration: DIALOG_DELAY,
          data: {link: false}
        });
        break;
      case "notifications":
        this.dialog.open(NotificationsComponent, {
          width: '350px',
          enterAnimationDuration: DIALOG_DELAY,
          exitAnimationDuration: DIALOG_DELAY,
          data: {}
        });
        break;
      case this.profile[0].label:
        this.dialog.open(WalletComponent, {width: '250px'});
        break;
      case this.profile[1].label:
        this.router.navigate(['dashboard', 'profile', uid]).then().catch();
        break;
      case this.profile[2].label:
        this.router.navigate(['dashboard']).then().catch();
        break;
      default:
        this.logout();
        break;
    }
  }

  logout(): void {
    this.auth.signOut().then().catch();
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

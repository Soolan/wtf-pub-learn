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
import {getMessaging, getToken, onMessage} from '@angular/fire/messaging';
import {environment} from '../../../../environments/environment';

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
  message: any = null;

  constructor(
    public auth: AngularFireAuth,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.products = PRODUCTS;
    this.profile = PROFILE;
    // ToDo: uncomment these when the notification mechanism was full implemented
    // this.requestPermission();
    // this.listen();
  }
  requestPermission() {
    const messaging = getMessaging();
    getToken(messaging,
      { vapidKey: environment.firebase.vapidKey}).then(
      (currentToken) => {
        if (currentToken) {
          console.log("Hurraaa!!! we got the token.....");
          console.log(currentToken);
        } else {
          console.log('No registration token available. Request permission to generate one.');
        }
      }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });
  }
  listen() {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      this.message=payload;
    });
  }


  exit(): void {
    this.router.navigate(['courses']).then().catch();
  }

  openDialog(name: string, uid?: string): void {
    switch (name) {
      case "login":
        this.dialog.open(AuthenticationComponent, {
          width: '360px',
          enterAnimationDuration: DIALOG_DELAY,
          exitAnimationDuration: DIALOG_DELAY,
          data: {link: false},
          panelClass: 'dialog'
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
        this.router.navigate(['dashboard', uid, 'profile', ]).then().catch();
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

import {Component, OnInit} from '@angular/core';
import {ToggleHeaderFooterService} from './shared/services/toggle-header-footer.service';
import {AngularFireMessaging} from '@angular/fire/compat/messaging';
import {mergeMapTo} from 'rxjs';
import {getMessaging, getToken, onMessage} from '@angular/fire/messaging';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'wtf-pub-learn';
  message: any = null;

  constructor(public toggle: ToggleHeaderFooterService) { }

  ngOnInit(): void {
    this.requestPermission();
    this.listen();
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
}

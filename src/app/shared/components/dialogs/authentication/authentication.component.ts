import {AfterViewInit, Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CrudService} from '../../../services/crud.service';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {PROFILES} from '../../../data/collections';
import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui';
import {CryptoSymbol, TxType} from '../../../data/enums';
import {Balance} from '../../../models/balance';
import {HOT_TAG, HOT_UID, WELCOME_FUND} from '../../../data/generic';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent implements AfterViewInit {
  ui!: firebaseui.auth.AuthUI;
  uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: (authResult: any, redirectUrl: any) => this.proceed(authResult, redirectUrl),
      uiShown: function () {
        // The widget is rendered.
        // Hide the loader.
        // @ts-ignore
        document.getElementById('loader').style.display = 'none';
      }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: '',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    // Terms of service url.
    tosUrl: 'terms-of-service',
    // Privacy policy url.
    privacyPolicyUrl: 'privacy-policy'
  };
  provider!: any;
  message!: string;
  success = false;
  summary: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<AuthenticationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public auth: AngularFireAuth,
    private crud: CrudService
  ) {
  }

  ngAfterViewInit(): void {
    if (!this.data.link) {
      this.ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
      this.ui.start('#firebaseui-auth-container', this.uiConfig);
    }

    this.auth.onAuthStateChanged((user) => {
      if (user) {
        user.sendEmailVerification().then(_ => this.summary.push('Activation link sent')).catch();

        // User is signed in.
        user.getIdTokenResult()
          .then(idTokenResult => {
            this.provider = idTokenResult.signInProvider;
            this.handleProfile(user.uid);
            // The result will look like  'google.com', 'facebook.com', ...
          });
      }
    }).then().catch();
  }

  proceed(authResult: any, redirectUrl: any): boolean {
    // User successfully signed in.
    // Return type determines whether we continue the redirect automatically
    // or whether we leave that to developer to handle.
    return false; // return true if you are redirecting somewhere after successful login
  }

  handleProfile(uid: string): void {
    this.crud.docRef('stats', 'wallet').get()
      .then((docSnapshot) => {
        const data = docSnapshot.data();
        const wallet_address = data.address;
        const tag = data.tag + 1;
        const balances= data.balances;
        const profile = this.crud.docRef(PROFILES.path, uid);
        profile.get().then((docSnapshot) => {
          if (!docSnapshot.exists) {
            profile.set({ // ToDo: Read display name, etc from the form into the document
              display_name: '',
              avatar: '',
              firstname: '',
              lastname: '',
              wallet_address,
              tag,
              balances: [WELCOME_FUND],
              loyalty: 0,
              achievements: [],
              suspended: false,
              timestamps: {
                created_at: Date.now(),
                updated_at: Date.now(),
                deleted_at: 0
              }
            }).then(_ => {
              this.success = true;
              this.crud.docRef('stats', 'wallet').update({tag}).then().catch();
              this.transact(`${PROFILES.path}/${uid}/transactions`, tag);  //deposit to new account
              this.balanceHotUID(tag, balances);
            })
              .catch()
          } else {
            this.dialogRef.close();
            window.location.assign(`/dashboard/${uid}`);
          }
        })
      })
  }

  balanceHotUID(tag: number, balances: Balance[]): void {
    // @ts-ignore
    balances.find(balance => balance.currency === CryptoSymbol.WTF).amount -= WELCOME_FUND.amount;
    console.log(balances)
    this.crud.docRef(PROFILES.path,HOT_UID).update({balances})
    this.transact(`${PROFILES.path}/${HOT_UID}/transactions`, tag);  //withdraw from hot tag
  }

  transact(path: string, tag: number): void {
    this.crud.colRef(path).add({
      type: TxType.Payment,
      from: HOT_TAG,
      to: tag,
      currency: WELCOME_FUND,
      timestamp: Date.now()
    })
    this.summary.push('Welcome funds deposited');
  }

  linkAccount(provider: string): void {
    switch (provider) {
      case "google":
        const googleProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().currentUser?.linkWithPopup(googleProvider)
          .then(_ => {
            this.message = "Google linked successfully!";
          })
          .catch(error => this.message = "Can not link your Google account. \n" + error);
        break;
      case "twitter":
        const twitterProvider = new firebase.auth.TwitterAuthProvider();
        firebase.auth().currentUser?.linkWithPopup(twitterProvider)
          .then(_ => {
            this.message = "Twitter linked successfully!";
          })
          .catch(error => this.message = "Can not link your Twitter account. \n" + error);
        break;
      case "email":
        //ToDo: read the email/password fields properly
        const credential = firebase.auth.EmailAuthProvider.credential('email', 'password');
        firebase.auth().currentUser?.linkWithCredential(credential).then().catch();
        break;
    }
  }
}

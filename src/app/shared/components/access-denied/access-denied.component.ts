import {Component, OnInit} from '@angular/core';
import {AuthenticationComponent} from '../dialogs/authentication/authentication.component';
import {DIALOG_DELAY} from '../../data/navigation';
import {MatLegacyDialog as MatDialog} from '@angular/material/legacy-dialog';
import {DenialReason} from '../../data/enums';
import {Denial} from '../../models/denial';
import {DENIAL_REASONS} from '../../data/generic';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import firebase from 'firebase/compat';
import User = firebase.User;
import {CrudService} from '../../services/crud.service';

@Component({
  selector: 'app-access-denied',
  templateUrl: './access-denied.component.html',
  styleUrls: ['./access-denied.component.scss']
})
export class AccessDeniedComponent implements OnInit {
  denial!: Denial;
  reason!: DenialReason;
  user!: User;
  userId!: string;
  sent = false;
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private crud: CrudService,
    private auth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    this.auth.authState.subscribe({
      next: user => {
        if (!user) {
          this.reason = DenialReason.SessionExpired;
          this.denial = DENIAL_REASONS[this.reason];
        } else if (!user?.emailVerified) {
          this.user = user;
          this.reason = DenialReason.AccountNotVerified;
          this.denial = DENIAL_REASONS[this.reason];
        } else {
          this.checkProfile(user.uid);
        }
      }
    })
  }

  checkProfile(id: string): void {
    this.crud.docRef('profiles', id).get()
      .then(snap => {
        if (snap.data().suspended) {
          this.reason = DenialReason.AccountSuspended;
          this.denial = DENIAL_REASONS[this.reason];
        } else if (snap.id != id) {
          this.reason = DenialReason.RestrictedArea;
          this.denial = DENIAL_REASONS[this.reason];
        } else {
          this.goHome();
        }
        console.log(this.denial)
      })
  }

  action(): void {
    switch (this.reason) {
      case DenialReason.SessionExpired: this.openDialog(); break;
      case DenialReason.AccountNotVerified: this.sendActivationEmail(); break;
      case DenialReason.AccountSuspended: this.contactCustomerService(); break;
      case DenialReason.RestrictedArea: this.upgradeAccount(); break;
      case DenialReason.NoReasonToDeny: this.goHome(); break;
    }
  }

  openDialog(): void {
    this.dialog.open(AuthenticationComponent, {
      width: '350px',
      enterAnimationDuration: DIALOG_DELAY,
      exitAnimationDuration: DIALOG_DELAY,
      data: {link: false}
    });
  }

  sendActivationEmail(): void {
    this.user.sendEmailVerification()
      .then(_ => {
        this.sent = true;
        this.reason = DenialReason.NoReasonToDeny;
        this.denial.reason = "Check your email & spam folder";
        this.denial.remedy = "Please click on activation link and re-login.";
        this.denial.action = "Go Home";
        setTimeout(_ => {
          this.auth.signOut()
        }, 7000);
      })
      .catch();
  }

  contactCustomerService(): void {}

  upgradeAccount(): void {}

  goHome(): void {
    this.router.navigate(['/']).then().catch()
  }
}

import {Component, OnInit} from '@angular/core';
import {AuthenticationComponent} from '../dialogs/authentication/authentication.component';
import {DIALOG_DELAY} from '../../data/navigation';
import {MatDialog} from '@angular/material/dialog';
import {DenialReason} from '../../data/enums';
import {Denial} from '../../models/denial';
import {DENIAL_REASONS} from '../../data/generic';
import {DenialReasonService} from '../../services/denial-reason.service';
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/compat/auth';

@Component({
  selector: 'app-access-denied',
  templateUrl: './access-denied.component.html',
  styleUrls: ['./access-denied.component.scss']
})
export class AccessDeniedComponent implements OnInit {
  denial!: Denial;
  reason = DenialReason.SessionExpired;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private auth: AngularFireAuth,
  ) {}

  ngOnInit(): void {
    if (this.reason == DenialReason.NoReasonToDeny || this.reason > 4) {
      this.router.navigate(['/']).then().catch()
    }
    this.denial = DENIAL_REASONS[this.reason]
  }

  action(): void {
    switch (this.reason) {
      case DenialReason.SessionExpired: this.openDialog(); break;
      case DenialReason.AccountNotVerified: this.sendActivationEmail(); break;
      case DenialReason.AccountSuspended: this.contactCustomerService(); break;
      case DenialReason.RestrictedArea: this.upgradeAccount(); break;
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

  sendActivationEmail(): void {}

  contactCustomerService(): void {}

  upgradeAccount(): void {}
}

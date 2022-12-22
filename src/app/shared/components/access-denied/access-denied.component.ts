import {Component, Input, OnInit} from '@angular/core';
import {AuthenticationComponent} from '../dialogs/authentication/authentication.component';
import {DIALOG_DELAY} from '../../data/navigation';
import {MatDialog} from '@angular/material/dialog';
import {DenialReason} from '../../data/enums';
import {Denial} from '../../models/denial';
import {DENIAL_REASONS} from '../../data/generic';

@Component({
  selector: 'app-access-denied',
  templateUrl: './access-denied.component.html',
  styleUrls: ['./access-denied.component.scss']
})
export class AccessDeniedComponent implements OnInit {
  @Input() reason?: DenialReason;

  denial!: Denial;
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    if (!this.reason) {
      this.reason = DenialReason.SessionExpired;
    }
    this.denial = DENIAL_REASONS[this.reason]
  }

  openDialog(): void {
        this.dialog.open(AuthenticationComponent, {
          width: '350px',
          enterAnimationDuration: DIALOG_DELAY,
          exitAnimationDuration: DIALOG_DELAY,
          data: {link: false}
        });
    }

}

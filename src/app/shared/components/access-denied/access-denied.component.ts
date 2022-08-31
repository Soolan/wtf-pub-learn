import { Component, OnInit } from '@angular/core';
import {AuthenticationComponent} from '../dialogs/authentication/authentication.component';
import {DIALOG_DELAY, PRODUCTS, PROFILE} from '../../data/navigation';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';

@Component({
  selector: 'app-access-denied',
  templateUrl: './access-denied.component.html',
  styleUrls: ['./access-denied.component.scss']
})
export class AccessDeniedComponent implements OnInit {

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openDialog(): void {
        this.dialog.open(AuthenticationComponent, {
          width: '350px',
          enterAnimationDuration: DIALOG_DELAY,
          exitAnimationDuration: DIALOG_DELAY,
          data: {link: false}
        });
    }

}

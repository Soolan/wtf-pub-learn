import { Injectable } from '@angular/core';
import {TopUpPleaseComponent} from '../components/dialogs/top-up-please/top-up-please.component';
import {Transaction} from '../models/transaction';
import {TxType} from '../data/enums';
import {P_COURSES, P_LESSONS, PROFILES, TRANSACTIONS} from '../data/collections';
import {Balance} from '../models/balance';
import {Profile} from '../models/profile';
import {MatLegacyDialog as MatDialog} from '@angular/material/legacy-dialog';
import {CrudService} from './crud.service';
import {MatLegacySnackBar as MatSnackBar} from '@angular/material/legacy-snack-bar';

@Injectable({
  providedIn: 'root'
})
export class PaymentGatewayService {
  hotWalletBalances: Balance[] = [];
  constructor(
    public dialog: MatDialog,
    private crud: CrudService,
    private snackBar: MatSnackBar,
  ) { }

  pay(payOption: Balance, profile: Profile, userId: string, courseId: string, lessonId: string, masterId: string): void {
    this.initHotBalances(masterId);
    const balance = profile.balances.find(balance => balance.currency == payOption.currency);
    const tag = profile.tag;
    if (!balance || balance.amount < payOption.amount) {
      this.dialog.open(TopUpPleaseComponent, {
        width: '400px',
        data: {balance, tag}
      });
    } else {
      const data: Transaction = {
        type: TxType.Payment,
        from: tag,
        to: 1000,
        balance: payOption,
        timestamp: Date.now()
      }
      this.addUserTx(data, profile, userId, courseId, lessonId);
      this.addHotWalletTx(data, masterId);
    }
  }

  initHotBalances(id: string): void {
    this.crud.get(PROFILES.path, id).subscribe({
      next: snap => this.hotWalletBalances = snap.data().balances,
      error: error => console.log(error)
    })
  }

  addUserTx(data: Transaction, profile: Profile, userId: string, courseId: string, lessonId: string): void {
    const userTxPath = `${PROFILES.path}/${userId}/${TRANSACTIONS.path}`;
    this.crud.add(userTxPath, data)
      .then(ref => {
        const lessonPath = `${PROFILES.path}/${userId}/${P_COURSES.path}/${courseId}/${P_LESSONS.path}`;
        this.updateBalance(userId, profile.balances, data.balance, false);
        this.crud.update(lessonPath, lessonId, {paid:  ref.path}).then().catch();
      })
      .catch()
    ;
  }

  addHotWalletTx(data: Transaction, masterId: string): void {
    const hotWalletTxPath = `${PROFILES.path}/${masterId}/${TRANSACTIONS.path}`;
    this.crud.add(hotWalletTxPath, data)
      .then(_ => this.updateBalance(masterId, this.hotWalletBalances, data.balance,true))
      .catch()
    ;
  }

  updateBalance(userId: string, balances: Balance[], payment: Balance, isDeposit: boolean): void {
    const balance = balances.find(b => b.currency == payment.currency);
    if (balance) {
      balance.amount = isDeposit ? Number(balance.amount) + payment.amount : balance.amount - payment.amount;
    } else {
      isDeposit ? balances.push(payment) : ''; // ToDo: Snackbar a message saying nothing to deduct
    }
    this.crud.update(PROFILES.path, userId, {balances})
      .then(_ => this.snackBar.open('Payment Successful!', 'X', {duration: 4000}))
      .catch()
    ;
  }
}

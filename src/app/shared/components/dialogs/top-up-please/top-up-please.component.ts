import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CRYPTO_SYMBOLS} from '../../../data/generic';
import {CryptoSymbol} from '../../../data/enums';
import {MatAccordion} from '@angular/material/expansion';

@Component({
  selector: 'app-top-up-please',
  templateUrl: './top-up-please.component.html',
  styleUrls: ['./top-up-please.component.scss']
})
export class TopUpPleaseComponent implements OnInit {
  @ViewChild(MatAccordion) accordion!: MatAccordion;

  cryptoSymbols = CRYPTO_SYMBOLS;
  constructor(
    public dialogRef: MatDialogRef<TopUpPleaseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    console.log(this.data)
    if (!this.data.balance) {
      this.data.balance = {currency: CryptoSymbol.XRP, amount: 0}
    }
  }

}

import {CryptoSymbol, TxType} from '../data/enums';

export interface Transaction {
  balance: number;
  type: TxType;
  from: number;
  to: number;
  currency: CryptoSymbol;
  amount: number;
  timestamp: number;
}

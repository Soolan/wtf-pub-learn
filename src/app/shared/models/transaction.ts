import {CryptoSymbol, TxType} from '../data/enums';
import {Balance} from './balance';

export interface Transaction {
  type: TxType;
  fromAddress?: string;
  from: number;
  to: number;
  currency: Balance;
  timestamp: number;
}

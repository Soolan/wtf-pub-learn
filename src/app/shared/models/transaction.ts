import {TxType} from '../data/enums';
import {Balance} from './balance';

export interface Transaction {
  type: TxType;
  fromAddress?: string;
  from: number;
  to: number;
  balance: Balance;
  timestamp: number;
}

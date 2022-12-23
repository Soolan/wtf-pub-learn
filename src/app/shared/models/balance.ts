import {CryptoSymbol} from '../data/enums';

export interface Balance {
  currency: CryptoSymbol;
  balance: number;
}

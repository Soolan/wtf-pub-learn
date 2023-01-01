import {CryptoSymbol} from '../data/enums';

export interface PayOption {
  currency: CryptoSymbol;
  amount: number;
}

import {Currency} from '../data/enums';

export interface PayOption {
  currency: Currency;
  amount: number;
}

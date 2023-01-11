import {Currency} from '../data/enums';

export interface Balance {
  currency: Currency;
  amount: number;
}

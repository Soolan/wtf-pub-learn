import {PayOption} from './pay-option';
import {BillableItem} from '../data/enums';

export interface Billable {
  item: BillableItem;
  payOptions: PayOption[]
}

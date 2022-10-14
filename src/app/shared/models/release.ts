import {WtfProduct} from '../data/enums';

export interface Release {
  version: string;
  date: string;
  product: WtfProduct;
  features: string[];
  improvements: string[];
  fixes: string[];
  operations: string[];
}

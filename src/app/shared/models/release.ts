import {WtfProduct} from '../data/enums';
import firebase from 'firebase/compat';
import Timestamp = firebase.firestore.Timestamp;

export interface Release {
  version: string;
  date: Timestamp;
  product: WtfProduct;
  features: string[];
  improvements: string[];
  fixes: string[];
  operations: string[];
}

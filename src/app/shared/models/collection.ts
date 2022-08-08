import firebase from 'firebase/compat';
import WhereFilterOp = firebase.firestore.WhereFilterOp;

export interface Collection {
  path: string;
  limit: number;
  where?: any;
  orderBy?: any;
}

export interface Where {
  field: string;
  operator: WhereFilterOp;
  value: any;
}


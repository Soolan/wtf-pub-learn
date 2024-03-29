import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore, CollectionReference, DocumentReference} from '@angular/fire/compat/firestore';
import {Collection} from '../models/collection';
import {AngularFireStorage} from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage
  ) { }

  all(collection: string): Observable<any> {
    return this.db.collection(collection).snapshotChanges();
  }

  docRef(collection: string, id: string): DocumentReference<any> {
    return this.db.collection(collection).doc(id).ref;
  }

  colRef(collection: string): CollectionReference<any> {
    return this.db.collection(collection).ref;
  }

  colRefQuery(collection: Collection): Observable<unknown[]> {
    return this.db.collection(
      collection.path, ref => ref
        .where(collection.where.field, collection.where.operator, collection.where.value)
        .orderBy(collection.orderBy.field, collection.orderBy.direction)
        .limit(collection.limit)
    ).snapshotChanges();
  }

  colRefQueryValues(collection: Collection): Observable<unknown[]> {
    return this.db.collection(
      collection.path, ref => ref
        .where(collection.where.field, collection.where.operator, collection.where.value)
        .orderBy(collection.orderBy.field, collection.orderBy.direction)
        .limit(collection.limit)
    ).valueChanges();
  }

  get(collection: string, id: string): Observable<any> {
    return this.db.collection(collection).doc(id).valueChanges();
  }

  set(collection: string, doc: string, data: any): Promise<any> {
    return this.db.collection(collection).doc(doc).set(data);
  }

  add(collection: string, data: any): Promise<any> {
    return this.db.collection(collection).add(data);
  }

  update(collection: string, id: string, data: any): Promise<any> {
    return this.db.doc(collection + '/' + id).update(data);
  }

  delete(collection: string, id: string): Promise<any> {
    return this.db.collection(collection).doc(id).delete();
  }

  mapId<T>(snaps: any[]): any {
    return snaps.map(snap => {
      return {
        id: snap.payload.doc.id,
        ...snap.payload.doc.data()
      };
    }) as T[];
  }
}

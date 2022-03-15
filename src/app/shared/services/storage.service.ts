import { Injectable } from '@angular/core';
import {AngularFireStorage, AngularFireStorageReference} from '@angular/fire/compat/storage';

export interface References {
  imageRef: AngularFireStorageReference;
  thumbRef: AngularFireStorageReference;
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: AngularFireStorage) { }

  getRefs(image: string, path: string): References {
    const filename = image.split('/')[1];
    const thumbPath = `${path}_files/${filename}_360x180`;
    return {
      imageRef: this.storage.ref(image),
      thumbRef: this.storage.ref(thumbPath)
    };
  }

  delete(references: References): void {
    references.imageRef.delete().toPromise()
      .then()
      .catch(error => console.log(error))
    ;
  }
}

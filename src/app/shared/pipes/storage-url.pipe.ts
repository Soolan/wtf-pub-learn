import {Pipe, PipeTransform} from '@angular/core';
import {AngularFireStorage} from '@angular/fire/compat/storage';
import {Observable} from 'rxjs';

@Pipe({
  name: 'storageUrl',
  pure: true
})

export class StorageUrlPipe implements PipeTransform {

  constructor(private storage: AngularFireStorage) { }

  transform(value: string): Observable<any> {
    return this.storage.ref(value).getDownloadURL();
  }
}


import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from '@angular/fire/compat/storage';
import {finalize, Observable} from 'rxjs';
import {Uploader} from '../../../models/uploader';

@Component({
  selector: 'app-upload-task',
  templateUrl: './upload-task.component.html',
  styleUrls: ['./upload-task.component.scss'],
})
export class UploadTaskComponent implements OnInit, OnChanges {

  @Input() file?: any;
  @Input() currentImage!: string;
  @Input() path!: string;
  @Output() uploaderEvents = new EventEmitter<Uploader>();

  uploader!: Uploader;
  task!: AngularFireUploadTask;
  ref!: AngularFireStorageReference;
  percentage!: Observable<number | undefined>;
  snapshot!: Observable<any>;
  downloadURL!: string;
  filename!: string;

  constructor(private storage: AngularFireStorage) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.currentImage) {
      this.ref = this.storage.ref(this.currentImage);
      this.emitUploaderEvents(this.currentImage);
    }
  }

  ngOnInit(): void {
    console.log(this.path);
    if (this.currentImage) {
      this.ref = this.storage.ref(this.currentImage);
      this.emitUploaderEvents(this.currentImage);
    } else if (this.file) {
      this.startUpload();
    }
  }

  startUpload(): void {
    this.filename = Date.now().toString();
    const path = `${this.path}_files/${this.filename}`;
    console.log(path, this.path);
    this.ref = this.storage.ref(path);
    this.task = this.storage.upload(path, this.file);

    if (this.task) {
      this.percentage = this.task.percentageChanges();
      this.snapshot = this.task.snapshotChanges().pipe(
        finalize(async () => {
          await this.emitUploaderEvents(path);
        })
      );
    }
  }

  private async emitUploaderEvents(path: string): Promise<void> {
    this.ref.getDownloadURL().toPromise().then(
      url => {
        this.downloadURL = url;
        const event: Uploader = {downloadURL: this.downloadURL, imagePath: path};
        this.uploaderEvents.emit(event);
      });
  }

  isActive(snapshot: any): boolean {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }
}

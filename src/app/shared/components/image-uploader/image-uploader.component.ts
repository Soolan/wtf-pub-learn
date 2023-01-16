import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {CARD_FLIP} from '../../animations/card-flip';
import {AngularFireStorage} from '@angular/fire/compat/storage';
import {References, StorageService} from '../../services/storage.service';
import {Uploader} from '../../models/uploader';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss'],
  animations: [CARD_FLIP]
})
export class ImageUploaderComponent implements OnInit {
  @ViewChild('fileInput') fileInput: any;
  @Input() currentImage!: string;
  @Input() path!: string;
  @Output() uploaderEvents = new EventEmitter<Uploader>();

  isHovering!: boolean;
  files: File[] = [];
  flipState = 'front'; // upload controls side
  references!: References;

  constructor(
    private storage: AngularFireStorage,
    private storageService: StorageService
  ) {
  }

  ngOnInit(): void {
    if (this.currentImage) {   // we already have a ref, flip to image side and display the image
      this.flipState = 'back'; // image side
      console.log(this.currentImage, this.path);
      this.references = this.storageService.getRefs(this.currentImage, this.path); // references for original and thumbnails
    }
  }

  handleEvent($event: Uploader | undefined): void {
    if ($event) {
      if ($event.imagePath === '') {
        this.reset();
      } else {
        this.currentImage = $event.imagePath;
        this.references = this.storageService.getRefs(this.currentImage, this.path);
      }
      this.uploaderEvents.emit($event);
    } else {
      this.flipState = 'front';
    }
  }

  toggleHover(event: any): void {
    this.isHovering = event;
  }

  onDrop(files: any): void {
    for (let i = 0; i < files.length; i++) {
      // @ts-ignore
      this.files.push(files.item(i));
    }
    this.flip();
  }

  onClickFileInputButton(): void {
    this.fileInput.nativeElement.click();
  }

  onChangeFileInput(): void {
    if (this.fileInput.nativeElement.files.length === 0) {
      return;
    }
    const files: { [key: string]: File } = this.fileInput.nativeElement.files;
    // ToDo: check file size + dimension before upload
    this.files.push(files[0]);
    this.flip();
  }

  flip(): void {
    if (this.flipState === 'front') {
      this.flipState = 'back';
    } else {
      this.flipState = 'front';
    }
  }

  async delete(): Promise<void> {
    // clear all fields
    const event: Uploader = {
      downloadURL: '',
      imagePath: ''
    };
    this.reset();
    await this.storageService.delete(this.references);
    this.uploaderEvents.emit(event);
  }

  reset(): void {
    this.fileInput.nativeElement.value = null;
    this.path = '';
    this.files = [];
    this.currentImage = '';
    this.flipState = 'front';
  }
}

import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Position} from '../../../../../../shared/data/enums';
import {AngularFireStorage} from '@angular/fire/compat/storage';

@Component({
  selector: 'app-text-image',
  templateUrl: './text-image.component.html',
  styleUrls: ['./text-image.component.scss']
})
export class TextImageComponent implements OnChanges{
  @Input() content!: any;
  position = Position;
  text!: string;
  image!: string;

  constructor(private storage: AngularFireStorage) { }

  ngOnChanges(changes: SimpleChanges) {
    this.text = this.content.text || this.content.scenario || this.content.question || this.content.summary;
    if (this.content.image) {
      this.storage.ref(this.content.image).getDownloadURL().subscribe({
        next: url => this.image = `url(${url})`,
        error: error => console.log(error)
      });
    }
  }
}

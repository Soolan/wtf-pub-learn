import {Component, Input, OnInit} from '@angular/core';
import {Position} from '../../../../../../shared/data/enums';
import {AngularFireStorage} from '@angular/fire/compat/storage';

@Component({
  selector: 'app-text-image',
  templateUrl: './text-image.component.html',
  styleUrls: ['./text-image.component.scss']
})
export class TextImageComponent implements OnInit {
  @Input() content!: any;
  position = Position;
  text!: string;
  image!: string;

  constructor(private storage: AngularFireStorage) {}

  ngOnInit(): void {
    this.text = this.content.text || this.content.question;
    this.storage.ref(this.content.image).getDownloadURL().subscribe({
      next: url => this.image = `url(${url})`,
      error: error => console.log(error)
    });
  }
}

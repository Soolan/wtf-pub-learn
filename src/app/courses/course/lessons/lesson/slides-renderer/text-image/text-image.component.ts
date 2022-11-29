import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {Position} from '../../../../../../shared/data/enums';
import {AngularFireStorage} from '@angular/fire/compat/storage';

@Component({
  selector: 'app-text-image',
  templateUrl: './text-image.component.html',
  styleUrls: ['./text-image.component.scss']
})
export class TextImageComponent implements OnChanges, AfterViewInit{
  @ViewChild('my_fucking_mark') my_fucking_mark!: ElementRef;

  @Input() content!: any;
  position = Position;
  text!: string;
  image!: string;

  constructor(private storage: AngularFireStorage, private renderer: Renderer2) { }
  ngAfterViewInit(): void {
    const tooltipInfo = document.getElementsByClassName('tooltip-info').item(0) as HTMLElement;

    if (tooltipInfo) {
      const right = tooltipInfo.getBoundingClientRect().right;
      const width = tooltipInfo.getBoundingClientRect().width;
      const innerWidth = window.innerWidth;
      const marginLeft = right >= innerWidth ?  -(60 + width/3) + '% !important' : -70 + '%';
      this.renderer.setStyle(tooltipInfo, 'margin-left', marginLeft);
    }
  }

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

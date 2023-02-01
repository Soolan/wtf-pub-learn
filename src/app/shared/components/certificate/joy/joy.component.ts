import {AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Certificate} from '../../../models/certificate';
import * as htmlToImage from 'html-to-image';

@Component({
  selector: 'app-joy',
  templateUrl: './joy.component.html',
  styleUrls: ['./joy.component.scss']
})
export class JoyComponent implements AfterViewInit {
  @ViewChild('joy') joy!: ElementRef;
  @ViewChild('output') output!: ElementRef;

  @Input() certificate!: Certificate;
  @Input() share!: any;

  constructor(private renderer: Renderer2) {
  }

  ngAfterViewInit() {
    this.createPng();
  }

  createPng(): void {
    htmlToImage.toPng(this.joy.nativeElement)
      .then(dataUrl => {
        this.joy.nativeElement.remove();
        const img = this.renderer.createElement('img');
        this.renderer.setAttribute(img, 'src', dataUrl);
        this.renderer.setAttribute(img, 'width', '300px');

        const a = this.renderer.createElement('a');
        this.renderer.setAttribute(a, 'href', dataUrl);
        this.renderer.setAttribute(a, 'download', `${this.certificate.fullName}.png`);
        this.renderer.setAttribute(a, 'target', '_blank');

        this.renderer.appendChild(a, img);
        this.renderer.appendChild(this.output.nativeElement, a);
      })
      .catch(function (error) {
        console.error('Oh nose!', error);
      });
  }
}

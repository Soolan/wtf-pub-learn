import {AfterViewInit, Component, ElementRef, Input, Renderer2, ViewChild} from '@angular/core';
import {Certificate} from '../../../models/certificate';
import * as htmlToImage from 'html-to-image';

@Component({
  selector: 'app-hope',
  templateUrl: './hope.component.html',
  styleUrls: ['./hope.component.scss']
})
export class HopeComponent implements AfterViewInit {
@ViewChild('hope') hope!: ElementRef;
@ViewChild('output') output!: ElementRef;
@Input() certificate!: Certificate;

  constructor(private renderer: Renderer2) {
  }

  ngAfterViewInit() {
    this.createPng();
  }

  createPng(): void {
    htmlToImage.toPng(this.hope.nativeElement)
      .then(dataUrl => {
        this.hope.nativeElement.remove();
        const img = this.renderer.createElement('img');
        this.renderer.setAttribute(img, 'src', dataUrl);
        this.renderer.setAttribute(img, 'width', '300px');

        const a = this.renderer.createElement('a');
        this.renderer.setAttribute(a, 'href', dataUrl);
        this.renderer.setAttribute(a, 'download', `${this.certificate.fullName}.png`);
        this.renderer.setAttribute(a, 'target', '_blank');
        // <a href="http://www.google.com" target="_blank" download="image.jpg"> //gives blank window
        // <img width="220" height="250" border="0" align="center"  src=""/> // show image into new window
        //   </a>

        this.renderer.appendChild(a, img);
        this.renderer.appendChild(this.output.nativeElement, a);

      })
      .catch(function (error) {
        console.error('Oh nose!', error);
      });
  }
}

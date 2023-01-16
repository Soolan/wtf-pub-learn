import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {Certificate} from '../../models/certificate';
import * as htmlToImage from 'html-to-image';
import {toPng, toJpeg, toBlob, toPixelData, toSvg} from 'html-to-image';
import {CertLayout} from '../../data/enums';
import {CERT_LAYOUTS} from '../../data/generic';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.scss']
})
export class CertificateComponent implements OnInit, AfterViewInit {
  @Input() certificate!: Certificate;
  layout = CertLayout;
  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.createPng(CERT_LAYOUTS[this.certificate.layout].toLowerCase());
  }

  createPng(id: string): void {
    const node = document.getElementById(id);
    const output = document.getElementById('output');
    if (node && output) {
      htmlToImage.toPng(node)
        .then(function (dataUrl) {
          node.remove();
          var img = new Image();
          img.src = dataUrl;
          img.width = 2000;
          output.appendChild(img);
        })
        .catch(function (error) {
          console.error('Oh nose!', error);
        });
    }
  }

}

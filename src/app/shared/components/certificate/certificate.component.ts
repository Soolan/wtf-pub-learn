import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {Certificate} from '../../models/certificate';
import * as htmlToImage from 'html-to-image';
import {toPng, toJpeg, toBlob, toPixelData, toSvg} from 'html-to-image';
import {CertLayout} from '../../data/enums';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.scss']
})
export class CertificateComponent implements OnInit, AfterViewInit {
  @Input() certificate!: Certificate;

  constructor() {
  }

  ngOnInit(): void {
    this.certificate = {
      courseId: '_someid__',
      courseName: 'The Best Coolio Course On Blockchain And Beyond',
      userId: 'oiuiouoiu',
      fullName: 'Sohail Great Courserator',
      grade: 87,
      timestamp: Date.now(),
      courseCreator: {fullName: 'S.S.Mava', profession: 'CEO, Write The Future'},
      present: {headline: '', description: 'Congratulations for completing'},
      layout: CertLayout.Joy,
    }
  }

  ngAfterViewInit() {
    this.createPng();
  }

  createPng(): void {
    const node = document.getElementById('certificate');
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

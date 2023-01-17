import {AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Certificate} from '../../../models/certificate';
import * as htmlToImage from 'html-to-image';

@Component({
  selector: 'app-joy',
  templateUrl: './joy.component.html',
  styleUrls: ['./joy.component.scss']
})
export class JoyComponent implements OnInit, AfterViewInit {
  @ViewChild('joy') joy!: ElementRef;
  @ViewChild('output') output!: ElementRef;

  @Input() certificate!: Certificate;

  constructor(private renderer: Renderer2) {
  }

  ngOnInit(): void {
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
        this.renderer.setAttribute(img, 'width', '400px');
        this.renderer.appendChild(this.output.nativeElement, img);
      })
      .catch(function (error) {
        console.error('Oh nose!', error);
      });
  }
}

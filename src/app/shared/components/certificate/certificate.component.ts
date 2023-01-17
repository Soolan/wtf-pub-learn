import {
  AfterViewInit,
  Component,
  ElementRef,
  Input, OnChanges,
  OnInit,
  Renderer2, SimpleChanges, TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {Certificate} from '../../models/certificate';
import * as htmlToImage from 'html-to-image';
import {toPng, toJpeg, toBlob, toPixelData, toSvg} from 'html-to-image';
import {CertLayout} from '../../data/enums';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.scss']
})
export class CertificateComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('outlet', {read: ViewContainerRef}) outletRef!: ViewContainerRef;
  @ViewChild('content', {read: TemplateRef}) contentRef!: TemplateRef<any>;

  @ViewChild('joy') joy!: ElementRef;
  @ViewChild('hope') hope!: ElementRef;
  @ViewChild('output') output!: ElementRef;
  @Input() certificate!: Certificate;

  node!: any;
  layout = CertLayout;
  constructor(private renderer: Renderer2) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log(changes);
    if (!changes['certificate'].firstChange) {
      this.reload();
      this.createPng();
    }
  }

  ngAfterViewInit() {
    this.createPng();
  }

  createPng(): void {
    this.node =
      this.certificate.layout == 0 ? this.hope.nativeElement :
        this.certificate.layout == 1 ? this.joy.nativeElement : undefined;
    if (this.node) {
      htmlToImage.toPng(this.node)
        .then(dataUrl => {
          // this.renderer.
          console.log(this.node);
          this.outletRef.clear();

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

  public reload() {
    this.renderer.setValue(this.output, '');
    this.outletRef?.clear();
    this.outletRef?.createEmbeddedView(this.contentRef);
  }
}

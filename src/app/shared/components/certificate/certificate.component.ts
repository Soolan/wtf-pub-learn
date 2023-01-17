import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2, TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {Certificate} from '../../models/certificate';
import * as htmlToImage from 'html-to-image';
import {toPng, toJpeg, toBlob, toPixelData, toSvg} from 'html-to-image';
import {CertLayout} from '../../data/enums';
import {CERT_LAYOUTS} from '../../data/generic';
import {render} from 'mermaid/dist/dagre-wrapper';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.scss']
})
export class CertificateComponent implements OnInit, AfterViewInit {
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

  ngAfterViewInit() {
    this.node =
      this.certificate.layout == 0 ? this.hope.nativeElement :
        this.certificate.layout == 1 ? this.joy.nativeElement : undefined;
    console.log(this.node);
    this.createPng();
  }

  createPng(): void {
    // console.log(this.output.nativeElement.value, this.hope.nativeElement.value, this.joy.nativeElement.value);

    if (this.node) {
      htmlToImage.toPng(this.node)
        .then(dataUrl => {
          // this.renderer.
          this.node.remove();
          // var img = new Image();
          // img.src = dataUrl;
          // img.width = 300;
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
    this.outletRef.clear();
    this.outletRef.createEmbeddedView(this.contentRef);
  }
}

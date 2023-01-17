import {
  Component,
  ElementRef,
  Input, OnChanges,
  OnInit,
  SimpleChanges, TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {Certificate} from '../../models/certificate';
import {CertLayout} from '../../data/enums';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.scss']
})
export class CertificateComponent implements OnInit, OnChanges {
  @ViewChild('outlet', {read: ViewContainerRef}) outletRef!: ViewContainerRef;
  @ViewChild('content', {read: TemplateRef}) contentRef!: TemplateRef<any>;

  @ViewChild('hope') hope!: ElementRef;
  @Input() certificate!: Certificate;

  node!: any;
  layout = CertLayout;
  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    // if (!changes['certificate'].firstChange) {
      this.reload();
    // }
  }

  public reload() {
    this.outletRef?.clear();
    this.outletRef?.createEmbeddedView(this.contentRef);
  }
}

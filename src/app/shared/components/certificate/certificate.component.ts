import {
  Component,
  Input, OnChanges,
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
export class CertificateComponent implements OnChanges {
  @ViewChild('outlet', {read: ViewContainerRef}) outletRef!: ViewContainerRef;
  @ViewChild('content', {read: TemplateRef}) contentRef!: TemplateRef<any>;
  @Input() certificate!: Certificate;
  layout = CertLayout;
  share!: any;

  ngOnChanges(changes: SimpleChanges) {
    this.reload();
    this.share = {
      url: `https://learn.wtf.pub/verify/${this.certificate.courseId.slice(0, 8)}?user=${this.certificate.userId.slice(0, 8)}`,
      message: `Certification for '${this.certificate.courseName}' course.`
    }
  }

  public reload() {
    this.outletRef?.clear();
    this.outletRef?.createEmbeddedView(this.contentRef);
  }
}

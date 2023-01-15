import {Component, Input, OnInit} from '@angular/core';
import {Certificate} from '../../models/certificate';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.scss']
})
export class CertificateComponent implements OnInit {
  @Input() certificate!: Certificate;
  constructor() { }

  ngOnInit(): void {
  }

}

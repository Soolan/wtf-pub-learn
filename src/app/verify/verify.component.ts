import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CrudService} from '../shared/services/crud.service';
import {CERTIFICATES} from '../shared/data/collections';
import {Certificate} from '../shared/models/certificate';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {
  courseId!: string;
  userId!: string;
  certificates: Certificate[] = [];

  constructor(
    private route: ActivatedRoute,
    private crud: CrudService
  ) {}

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('courseId') || '';
    this.userId = this.route.snapshot.queryParams['user'];
    console.log(this.courseId, this.userId, this.route.snapshot.queryParams)
    if (this.courseId && this.userId) {
      const query = {...CERTIFICATES};
      query.where = {
        field: 'verification',
        operator: '==',
        value: `${this.courseId}-${this.userId}`
      };
      this.crud.colRefQueryValues(query).subscribe({
        next: docs => docs.forEach(cert => {
          console.log(cert);
          this.certificates.push(<Certificate>cert)
        }),
        error: err => console.log(err)
      });
    }
  }
}

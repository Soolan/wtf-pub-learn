import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CrudService} from '../shared/services/crud.service';
import {CERTIFICATES} from '../shared/data/collections';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {
  courseId!: string;
  userId!: string;

  constructor(
    private route: ActivatedRoute,
    private crud: CrudService
  ) {}

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('courseId') || '';
    this.userId = this.route.snapshot.queryParams['user'].value;
    if (this.courseId && this.userId) {
      this.crud.docRef(CERTIFICATES.path)
    }
  }

}

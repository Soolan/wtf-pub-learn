import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CrudService} from '../shared/services/crud.service';
import {CERTIFICATES} from '../shared/data/collections';
import {Certificate} from '../shared/models/certificate';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {
  displayedColumns: string[] = ['courseName', 'timestamp'];
  dataSource!: MatTableDataSource<Certificate>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  courseId!: string;
  userId!: string;
  queriedCert!: Certificate;
  certificates!: Certificate[];

  constructor(
    private route: ActivatedRoute,
    private crud: CrudService
  ) {
    this.courseId = this.route.snapshot.paramMap.get('courseId') || '';
    this.userId = this.route.snapshot.queryParams['user'];
    if (this.courseId && this.userId) {
      this.getCertificate();
    }
  }

  ngOnInit(): void {
    this.crud.colRefQueryValues(CERTIFICATES).subscribe({
      next: docs =>  {
        this.certificates = <Certificate[]>docs;
        this.dataSource = new MatTableDataSource(this.certificates);
      },
      error: err => console.log(err)
    });
  }

  private getCertificate() {
    const query = {...CERTIFICATES};
    query.where = {
      field: 'verification',
      operator: '==',
      value: `${this.courseId}-${this.userId}`
    };
    this.crud.colRefQueryValues(query).subscribe({
      next: docs =>  this.queriedCert = <Certificate>docs[0],
      error: err => console.log(err)
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

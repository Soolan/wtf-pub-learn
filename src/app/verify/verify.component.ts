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
  displayedColumns: string[] = ['no', 'courseName', 'timestamp', 'actions'];
  dataSource!: MatTableDataSource<Certificate>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  courseId!: string;
  userId!: string;
  loading = true;
  queriedCert!: Certificate;
  certificates!: Certificate[];

  constructor(
    private route: ActivatedRoute,
    private crud: CrudService
  ) {
      this.route.queryParams.subscribe({
        next: params => {
          console.log(params)
          this.courseId = this.route.snapshot.paramMap.get('courseId') || '';
          this.userId = params['user'];
          if (this.courseId && this.userId) {
            this.getCertificate();
          }
        },
        error: err => console.log(err)
      })
  }

  ngOnInit(): void {
    this.crud.colRefQueryValues(CERTIFICATES).subscribe({
      next: docs =>  {
        this.certificates = <Certificate[]>docs;
        this.dataSource = new MatTableDataSource(this.certificates);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loading = false;
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

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

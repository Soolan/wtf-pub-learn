import { Component, OnInit } from '@angular/core';
import {Lesson} from '../../../shared/models/lesson';
import {CrudService} from '../../../shared/services/crud.service';
import {ActivatedRoute} from '@angular/router';
import {COURSES, LESSONS} from '../../../shared/data/collections';
import {CURRENCIES} from '../../../shared/data/generic';

@Component({
  selector: 'app-final-exam',
  templateUrl: './final-exam.component.html',
  styleUrls: ['./final-exam.component.scss']
})
export class FinalExamComponent implements OnInit {
  exam!: Lesson;
  courseId!: string;
  path!: string;
  currencies = CURRENCIES;
  constructor(
    private crud: CrudService,
    private route: ActivatedRoute
  ) {
    this.courseId = this.route.snapshot.paramMap.get('courseId') || '';
    if(this.courseId) {
      this.path = `${COURSES.path}/${this.courseId}/${LESSONS.path}`;
    }
  }

  ngOnInit(): void {
    if (this.path) {
      this.crud.docRef(this.path, 'final-exam').get()
        .then(snapshot => {
          this.exam = snapshot.data();
          console.log(this.exam)
        })
        .catch()
      ;
    }
  }

}

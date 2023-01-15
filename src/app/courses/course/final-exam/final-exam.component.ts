import {Component, Input, OnInit} from '@angular/core';
import {Lesson} from '../../../shared/models/lesson';
import {CrudService} from '../../../shared/services/crud.service';
import {ActivatedRoute} from '@angular/router';
import {COURSES, LESSONS} from '../../../shared/data/collections';
import {CURRENCIES} from '../../../shared/data/generic';
import {PaymentGatewayService} from '../../../shared/services/payment-gateway.service';
import {CurrentService} from '../../../shared/services/current.service';
import {CertLayout} from '../../../shared/data/enums';

@Component({
  selector: 'app-final-exam',
  templateUrl: './final-exam.component.html',
  styleUrls: ['./final-exam.component.scss']
})
export class FinalExamComponent implements OnInit {
  exam!: Lesson;
  proceed = false;
  courseId!: string;
  path!: string;
  currencies = CURRENCIES;

  certificate = {
    courseId: this.courseId,
    courseName: 'Coolio course',
    userId: 'oiuiouoiu',
    fullName: 'Sohail the Great',
    grade: 87,
    timestamp: Date.now(),
    courseCreator: {fullName: 'S.S.Mava', profession: 'CEO, Write The Future'},
    present: {headline: '', description: ''},
    layout: CertLayout.Joy,
  }
  constructor(
    private crud: CrudService,
    private route: ActivatedRoute,
    private currentService: CurrentService,
    private paymentService: PaymentGatewayService
  ) {
    this.courseId = this.route.snapshot.paramMap.get('courseId') || '';
    if(this.courseId) {
      this.path = `${COURSES.path}/${this.courseId}/${LESSONS.path}`;
    }
  }

  ngOnInit(): void {
    console.log(this.currentService.current.value)

    if (this.path) {
      this.crud.docRef(this.path, 'final-exam').get()
        .then(snapshot => {
          this.exam = snapshot.data();
        })
        .catch()
      ;
    }
  }

  pay(): void {
    this.proceed = true;
  }
}

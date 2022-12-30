import { Component, OnInit } from '@angular/core';
import {CrudService} from '../../services/crud.service';

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.scss']
})
export class TermsAndConditionsComponent implements OnInit {
  content!: string;
  constructor(private crud: CrudService) { }

  ngOnInit(): void {
    this.crud.docRef('legals', 'terms-and-conditions').get()
      .then(snap => {
        console.log(snap.data())
        this.content = snap.data().content
      })
      .catch()
    ;
  }
}

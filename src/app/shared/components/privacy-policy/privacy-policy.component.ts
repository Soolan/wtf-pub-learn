import { Component, OnInit } from '@angular/core';
import {CrudService} from '../../services/crud.service';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent implements OnInit {
  content!: string;
  constructor(private crud: CrudService) { }

  ngOnInit(): void {
    this.crud.docRef('legals', 'privacy-policy').get()
      .then(snap => {
        console.log(snap.data())
        this.content = snap.data().content
      })
      .catch()
    ;
  }
}

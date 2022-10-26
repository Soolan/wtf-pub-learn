import {Component, Input, OnInit} from '@angular/core';
import {CrudService} from '../../../../../../shared/services/crud.service';
import {POLLS} from '../../../../../../shared/data/collections';
import {Poll} from '../../../../../../shared/models/poll';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.scss']
})
export class PollComponent implements OnInit {
  @Input() slide: any;
  voted = false;
  poll!: Poll;

  constructor(private crud: CrudService) { }

  ngOnInit(): void {
  }

  cast(index: number): void {
    this.crud.set(POLLS.path, this.slide.id, {})
  }
}

import {Component, Input, OnInit} from '@angular/core';
import {CrudService} from '../../../../../../shared/services/crud.service';
import {POLLS} from '../../../../../../shared/data/collections';
import {Poll} from '../../../../../../shared/models/poll';

export interface Percentage {
  option: string;
  percentage: number;
}

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.scss', '../slide.scss']
})
export class PollComponent implements OnInit {
  @Input() slide: any;
  poll!: Poll;
  stringRef = String;

  constructor(private crud: CrudService) {
  }

  ngOnInit(): void {
    this.crud.docRef(POLLS.path, this.slide.id).get()
      .then(snap => this.poll = snap.data())
      .catch()
    ;
  }

  cast(index: number): void {
    this.poll.votes[index].count++;
    this.poll.timestamps.updated_at = Date.now();
    this.crud.set(POLLS.path, this.slide.id, this.poll)
      .then(_ => {
        localStorage.setItem('voted', Date.now().toString())
      })
      .catch(error => console.log(error))
    ;
  }

  get canVote(): boolean {
    const votedAt = localStorage.getItem('voted');
    if (votedAt) {
      const week = 7 * 24 * 60 * 60 * 1000;
      const lastWeek = Date.now() - week;
      return parseInt(votedAt) < lastWeek;
    }
    return true;
  }

  get percentages(): Percentage[] {
    let percentages: Percentage[] = [];
    const total = this.poll.votes.reduce((vote, {count}) => vote + count, 0);
    this.poll.votes.forEach(vote => {
      percentages.push({
        option: vote.option,
        percentage: vote.count / total * 100
      })
    })
    console.log(percentages)
    return percentages;
  }
}

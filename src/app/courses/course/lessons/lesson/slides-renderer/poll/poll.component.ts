import {Component, Input, OnInit} from '@angular/core';
import {CrudService} from '../../../../../../shared/services/crud.service';
import {POLLS} from '../../../../../../shared/data/collections';
import {Poll} from '../../../../../../shared/models/poll';
import {FADE_IN_OUT} from '../../../../../../shared/animations/fade-in-out';

export interface Percentage {
  option: string;
  percentage: number;
}

export interface MyVote {
  optionIndex: number;
  date: number;
}

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.scss', '../slide.scss'],
  animations: [FADE_IN_OUT],
})
export class PollComponent implements OnInit {
  @Input() slide: any;
  poll!: Poll;
  total!: number;
  stringRef = String;
  lastVote!: MyVote;

  constructor(private crud: CrudService) {
  }

  ngOnInit(): void {
    this.crud.docRef(POLLS.path, this.slide.id).get()
      .then(snap => {
        this.poll = snap.data();
        console.log(this.poll)
      })
      .catch()
    ;

  }

  cast(index: number): void {
    this.poll.votes[index].count++;
    this.poll.timestamps.updated_at = Date.now();
    console.log(this.poll)
    const vote: MyVote = {
      optionIndex: index,
      date: Date.now()
    }
    this.crud.set(POLLS.path, this.slide.id, this.poll)
      .then(_ => localStorage.setItem(`wtf-poll-${this.slide.id}`, JSON.stringify(vote)))
      .catch(error => console.log(error))
    ;
  }

  get canVote(): boolean {
    const vote = localStorage.getItem(`wtf-poll-${this.slide.id}`);
    if (vote) {
      this.lastVote  = JSON.parse(vote);
      const week = 7 * 24 * 60 * 60 * 1000;
      const lastWeek = Date.now() - week;
      return this.lastVote.date < lastWeek;
    }
    return true;
  }

  get percentages(): Percentage[] {
    let percentages: Percentage[] = [];
    this.total = this.poll.votes.reduce((vote, {count}) => vote + count, 0);
    this.poll.votes.forEach(vote => {
      percentages.push({
        option: vote.option,
        percentage: vote.count / this.total * 100
      })
    })
    return percentages;
  }
}

import {Component, ElementRef, Input, OnChanges, Renderer2, SimpleChanges, ViewChild} from '@angular/core';
import {Position} from '../../../../../../shared/data/enums';
import {Card} from '../../../../../../shared/models/slide';
import {SlideService} from '../slide.service';

export interface MatchStatus {
  question: any;
  answered: boolean;
}
@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss', '../slide.scss']
})
export class MatchComponent implements OnChanges {
  @Input() slide: any;
  @ViewChild('answersRef') answersRef!: ElementRef;
  @ViewChild('questionsRef') questionsRef!: ElementRef;
  @ViewChild('matched') matched!: ElementRef;

  position = Position;
  matches!: Card[];
  index = 0;
  questions!: string[];
  answers!: string[];
  pending!: string[];
  isCompleted = false;
  bottom = 0;

  constructor(private slideService: SlideService, private renderer: Renderer2) { }

  ngOnChanges(changes: SimpleChanges) {
    this.reset();
    this.initColumns();

    setTimeout(() => {
      this.initClicks();
    }, 500)
  }

  private reset(): void {
    this.questions = [];
    this.answers = [];
    this.index = 0;
    this.isCompleted = false;
    if (this.questionsRef) this.removeChildren(this.questionsRef);
    if (this.answersRef) this.removeChildren(this.answersRef);
  }

  removeChildren(node: ElementRef): void {
    for (let child of node.nativeElement.children) {
      this.renderer.removeChild(node.nativeElement, child);
    }
  }

  private initColumns(): void {
    this.matches = this.slide.content.matches;
    this.matches.forEach(match => {
      this.questions.push(match.question);
      this.answers.push(match.answer);
    })
    // shuffle the questions & answers
    this.answers.sort(() => Math.random() - 0.5);
    this.questions.sort(() => Math.random() - 0.5);
    this.pending = {...this.questions}; // save a questions copy to pending, not a reference
  }

  private initClicks(): void {
    this.questionsRef.nativeElement.children.forEach((question:any, index: number) => {
      this.renderer.listen(question, 'click', () => {
        this.index = index;
      });
    });

    this.answersRef.nativeElement.children.forEach((answer: any) => {
      this.renderer.listen(answer, 'click', () => this.check(answer, answer.innerText));
    });
  }

  private check(answerDom: any, answer: string): void {
    const correct = this.matches.find(match => match.question === this.questions[this.index])?.answer;
    const questionDom = this.questionsRef.nativeElement.children['question' + this.index];
    if (answer === correct) {
      this.bottom += this.index * this.index;
      this.slideService.matchColumns(questionDom, answerDom, this.index);
      this.setIndex();
    } else {
      this.slideService.shake(answerDom);
    }
  }

  private setIndex(): void {  // [0,1,2,3]
    if (this.pending.length == 0) {
      this.markAsCompleted();
      return;
    }
    this.pending.splice(this.index, 1);
    if(this.pending[this.index]) {
      this.index ++;
    } else {

    }
  }

  private markAsCompleted(): void {
    this.isCompleted = true;
    this.updateUI();
  }

  updateUI(): void {
    this.slideService.next({
      marker: this.slideService.markerIndex,
      action: this.slideService.actionMessage,
      response: '',
      correct: false,
      completed: this.isCompleted
    })
  }
}

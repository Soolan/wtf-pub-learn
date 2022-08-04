import {Component, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges, ViewChild} from '@angular/core';
import {Position} from '../../../../../../shared/data/enums';
import {Card} from '../../../../../../shared/models/slide';
import {SlideService} from '../slide.service';

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
  }

  private initClicks(): void {
    for (let answer of this.answersRef.nativeElement.children) {
      this.renderer.listen(answer, 'click', () => this.check(answer, answer.innerText))
    }
  }

  private check(answerDom: any, answer: string): void {
    const correct = this.matches.find(match => match.question === this.questions[this.index])?.answer;
    const questionDom = this.questionsRef.nativeElement.children['question' + this.index];
    if (answer === correct) {
      this.index++;
      this.bottom += this.index * this.index;
      console.log(this.index, this.bottom);
      this.slideService.matchColumns(questionDom, answerDom, this.index);
      // this.slideRenderer.addChild();
      if (this.index >= this.answers.length) {
        this.markAsCompleted();
      }
    } else {
      this.slideService.shake(answerDom);
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

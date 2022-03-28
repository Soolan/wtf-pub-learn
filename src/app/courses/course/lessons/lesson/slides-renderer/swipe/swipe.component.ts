import {Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Position} from '../../../../../../shared/data/enums';
import {Card} from '../../../../../../shared/models/slide';
import {SlideService} from '../slide.service';

@Component({
  selector: 'app-swipe',
  templateUrl: './swipe.component.html',
  styleUrls: ['./swipe.component.scss', '../slide.scss']
})
export class SwipeComponent implements OnChanges {
  @Input() slide: any;
  @ViewChild('cards') cardsRef!: ElementRef;

  position = Position;
  cards: Card[] = [];
  index = 0;
  isCorrect!: boolean;
  isCompleted = false;

  constructor(private slideService: SlideService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.reset();
    this.initCards();
    setTimeout(() => {
      for (let child of this.cardsRef.nativeElement.children) {
        this.slideService.transformCard(child);
        console.log(child)
      }
    }, 400);

    setTimeout(() => {
      const index: string = `card${this.cards.length-1}`;
      this.slideService.straightCard(this.cardsRef.nativeElement.children[index]);
    }, 500)
  }

  reset() {
    this.isCorrect = false;
    this.isCompleted = false;
  }

  initCards(): void {
    this.cards = this.slide.content.cards;
    this.index = this.cards.length - 1;
  }

  check(swipe: string): void {
    const direction = swipe === this.slide.content.swipe_left ? 'left' : 'right';
    const element = this.cardsRef.nativeElement.children[`card${this.index}`];
    this.isCorrect = swipe === this.cards[this.index].answer;
    this.isCorrect ? this.swipe(element, direction) : this.slideService.dontSwipeCard(element, direction);
  }

  swipe(element: any, direction: string): void {
    this.slideService.swipeCard(this.cardsRef.nativeElement.children[`card${this.index}`], direction);
    this.index--;
    if( this.index >= 0) {
      this.slideService.straightCard(this.cardsRef.nativeElement.children[`card${this.index}`]);
    } else {
      this.markAsCompleted()
    }
  }

  markAsCompleted(): void {
    this.isCompleted = true;
    this.updateUI();
  }

  updateUI(): void {
    this.slideService.next({
      marker: this.slideService.markerIndex,
      action: this.slideService.actionMessage,
      response: '',
      correct: this.isCorrect,
      completed: this.isCompleted
    })
  }
}

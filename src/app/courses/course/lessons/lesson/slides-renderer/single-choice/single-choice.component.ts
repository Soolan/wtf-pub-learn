import {Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {FADE_IN_OUT} from '../../../../../../shared/animations/fade-in-out';
import {SLIDE_UP} from '../../../../../../shared/animations/slide-up';
import {Position} from '../../../../../../shared/data/enums';
import {OptionSet, Option} from '../../../../../../shared/models/slide';
import {SlideService} from '../slide.service';
import {SLIDE_LEFT} from '../../../../../../shared/animations/slide-left';
import {CurrentService} from '../../../../../../shared/services/current.service';

@Component({
  selector: 'app-single-choice',
  templateUrl: './single-choice.component.html',
  styleUrls: ['./single-choice.component.scss', '../slide.scss'],
  animations: [SLIDE_LEFT, SLIDE_UP, FADE_IN_OUT],
})
export class SingleChoiceComponent implements OnChanges {
  @Input() slide: any;
  @ViewChild('optionSet') optionSetRef!: ElementRef;

  position: any = Position;
  answer: string = '';
  options: string[] = [];
  set!: OptionSet;
  response = '';
  isCorrect = false;
  isCompleted = false;

  constructor(private slideService: SlideService) { }

  ngOnChanges(changes: SimpleChanges) {
    this.reset();
    this.initOptionSet();
    if (this.optionSetRef) {
      for (let child of this.optionSetRef.nativeElement.children) {
        this.slideService.resetButtonStyles(child);
      }
    }
  }

  private reset() {
    this.response = '';
    this.isCorrect = false;
    this.isCompleted = false;
    this.answer = this.slide.content.answer;
  }

  initOptionSet(): void {
    this.set = this.slideService.initOptionSet(
      true,
      this.slide.content.options,
      this.answer,
      this.slide.content.options_per_set
    );
  }

  check(answer: string, $event: Event): void {
    this.isCorrect = this.answer === answer;
    this.response = this.slide.content.options.find((option: Option) => option.value === answer).response;
    if ($event.target) {
      this.isCorrect ? this.markAsComplete($event.target) : this.slideService.markAsIncorrect($event.target);
    }
    this.response = this.slide.content.options.find((option: Option) => option.value === answer).response;
    this.updateUI();
  }

  markAsComplete(button: EventTarget) {
    this.isCompleted = true;
    this.slideService.markAsCorrect(button);
    this.updateUI();
  }

  updateUI(): void {
    this.slideService.next({
      marker: this.slideService.markerIndex,
      action: this.slideService.actionMessage,
      response: this.response,
      correct: this.isCorrect,
      completed: this.isCompleted
    })
  }
}

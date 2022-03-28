import {Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {FADE_IN_OUT} from '../../../../../../shared/animations/fade-in-out';
import {Position} from '../../../../../../shared/data/enums';
import {Answer, Option, OptionSet} from '../../../../../../shared/models/slide';
import {SlideService} from '../slide.service';

@Component({
  selector: 'app-multiple-choice',
  templateUrl: './multiple-choice.component.html',
  styleUrls: ['./multiple-choice.component.scss', '../slide.scss'],
  animations: [FADE_IN_OUT],
})
export class MultipleChoiceComponent implements OnChanges {
  @Input() slide: any;
  @ViewChild('optionSet') optionSetRef!: ElementRef;

  position = Position;
  answers!: string[];
  options!: string[];
  set!: OptionSet;
  response = '';
  isCorrect = false;
  isCompleted = false;
  shakeState!: string;
  correctAnswers = 0;

  constructor(private slideService: SlideService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.reset();
    this.initAnswers();
    this.initOptionSet();
    if (this.optionSetRef) {
      for (let child of this.optionSetRef.nativeElement.children) {
        this.slideService.resetButtonStyles(child);
      }
    }
  }

  private reset(): void {
    this.set = {isActive: false, isSingle: false, options: []};
    this.answers = [];
    this.options = [];
    this.response = '';
    this.isCorrect = false;
    this.isCompleted = false;
    this.correctAnswers = 0;
  }

  initAnswers(): void {
    this.answers = this.slide.content.answers.map((a: Answer) => a.answer);
  }

  initOptionSet(): void {
    this.initOptions();
    let isActive = true;
    let options = this.slideService.randomizeMultiChoiceOptions(
      this.slide.content.options_per_set,
      this.options,
      this.answers
    );
    let isSingle = this.slideService.isSingleColumn(this.options);
    this.set = {isActive, options, isSingle};
    console.log(this.set);
  }

  initOptions(): void {
    // Create a pull of options without correct answers
    this.slide.content.options.forEach((option: Option) => {
      if (this.answers.indexOf(option.value) == -1) {
        this.options.push(option.value);
      }
    });
  }

  check(answer: string, $event: Event): void {
    this.isCorrect = this.answers.includes(answer);
    this.shakeState = this.isCorrect ? 'still' : 'shake';
    this.response = this.slide.content.options.find((option: Option) => option.value === answer).response;

    if ($event.target){
      if (this.isCorrect) {
        this.correctAnswers ++;
        if (this.correctAnswers < this.answers.length) {
          this.slideService.markAsCorrect($event.target);
        } else {
          this.markAsComplete($event.target);
        }
      } else {
        this.slideService.markAsIncorrect($event.target);
      }
    }
  }

  markAsComplete(button: EventTarget): void {
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
    setTimeout(_ => this.shakeState = 'still', 100);
  }
}

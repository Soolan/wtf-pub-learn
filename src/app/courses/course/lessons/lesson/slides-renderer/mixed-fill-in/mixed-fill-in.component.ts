import {Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Option, OptionSet} from '../../../../../../shared/models/slide';
import {SlideService} from '../slide.service';
import {FADE_IN_OUT} from '../../../../../../shared/animations/fade-in-out';

@Component({
  selector: 'app-mixed-fill-in',
  templateUrl: './mixed-fill-in.component.html',
  styleUrls: ['./mixed-fill-in.component.scss',  '../slide.scss'],
  animations: [FADE_IN_OUT]
})
export class MixedFillInComponent implements OnChanges {
  @Input() slide: any;
  @ViewChild('scenario') scenario!: ElementRef;
  @ViewChild('optionSet') optionSetRef!: ElementRef;

  blanks: any[] = [];
  answers: string[] = [];
  options: string[] = [];
  optionSets: OptionSet[] = [];
  currentSet = 0;
  response = '';
  isCorrect!: boolean;
  isCompleted = false;

  constructor(private slideService: SlideService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.reset();
    this.initAnswers();
    this.initOptionSets();
    if (this.optionSetRef) {
      for (let child of this.optionSetRef.nativeElement.children) {
        this.slideService.resetButtonStyles(child);
      }
    }
  }

  reset(): void {
    this.response = '';
    this.currentSet = 0;
    this.isCorrect = false;
    this.isCompleted = false;
    this.blanks = [];
    this.answers = [];
    this.options = [];
    this.optionSets = [];
  }

  initAnswers(): void {
    this.answers = this.slide.content.answers.map( (a: any) => a.answer);
  }

  initOptionSets(): void {
    let index: number = 0;
    this.initOptions();

    this.answers.forEach(answer => {
      let start = index * this.slide.content.options_per_set;
      let end = start + this.slide.content.options_per_set - 1;
      let options = this.slideService.randomizeOptions(this.slide.content.options_per_set, this.options.slice(start, end), answer);
      let isActive = this.currentSet == index++;
      let isSingle = this.slideService.isSingleColumn(options);
      this.optionSets.push({isActive, options, isSingle});
    });
  }

  initOptions(): void {
    // Create a pool of options without correct answers
    this.slide.content.options.forEach( (option: any) => {
      if (this.answers.indexOf(option.value) == -1) {
        this.options.push(option.value);
      }
    });
  }

  initBlanks() {
    let index = 0;
    this.answers.forEach(answer => {
      this.blanks.push(this.scenario.nativeElement.children['blank' + index++]);
    });
  }

  check(answer: string, $event: Event): void {
    if(this.currentSet == 0) {
      this.initBlanks();
    }
    this.isCorrect = this.answers[this.currentSet] === answer;
    if ($event.target) {
      if (this.isCorrect) {
        this.slideService.fillBlank(this.blanks[this.currentSet], answer);
        this.moveToNextOptionsSet();
      } else {
        this.slideService.markAsIncorrect($event.target);
      }
    }
    this.response = this.slide.content.options.find( (option: any) => option.value === answer).response;
    this.updateUI();
  }

  moveToNextOptionsSet(): void {
    console.log(this.answers.length > this.currentSet+1, this.optionSets, this.currentSet);
    if (this.answers.length > this.currentSet+1) {
      this.optionSets[this.currentSet++].isActive = false;
      setTimeout (() => {
        this.optionSets[this.currentSet].isActive = true;
      }, 200)
    } else {
      this.isCompleted = true;
      this.optionSets[this.currentSet].isActive = false;
    }
    console.log(this.answers.length >= this.currentSet, this.isCompleted);

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

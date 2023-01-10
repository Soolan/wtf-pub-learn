import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {FADE_IN_OUT} from '../../../../../../shared/animations/fade-in-out';
import {Position} from '../../../../../../shared/data/enums';
import {Answer, Option, OptionSet, SlideButton} from '../../../../../../shared/models/slide';
import {SlideService} from '../slide.service';
import {ExamService} from '../exam.service';

@Component({
  selector: 'app-multiple-choice',
  templateUrl: './multiple-choice.component.html',
  styleUrls: ['./multiple-choice.component.scss', '../slide.scss'],
  animations: [FADE_IN_OUT],
})
export class MultipleChoiceComponent implements OnInit, AfterViewInit {
  @Input() slide: any;
  @ViewChild('optionSet') optionSetRef!: ElementRef;


  position = Position;
  answers!: string[];
  options!: string[];
  set!: OptionSet;
  response = '';
  isCorrect = false;
  isCompleted = false;
  correctAnswers = 0;
  slideButtons: SlideButton[] = [];

  constructor(
    private examService: ExamService,
    private slideService: SlideService
  ) { }

  ngOnInit(): void {
    this.reset();
    this.initAnswers();
    this.initOptionSet();
  }

  ngAfterViewInit(): void {
    this.initButtons();
  }

  private reset(): void {
    this.set = {isActive: false, isSingle: false, options: []};
    this.answers = [];
    this.options = [];
    this.slideButtons = [];
    this.response = '';
    this.isCorrect = false;
    this.isCompleted = false;
    this.correctAnswers = 0;
  }

  private initButtons() {
    if (this.optionSetRef) {
      for (let child of this.optionSetRef.nativeElement.children) {
        this.slideService.resetButtonStyles(child);
        this.slideButtons.push({dom: child, active: true});
      }
    }
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
    console.log(options);
    let isSingle = this.slideService.isSingleColumn(this.options);
    this.set = {isActive, options, isSingle};
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
    if ($event.target){
      if (this.examService.results.value) {
        const button = this.slideButtons.find((element: any) => element.dom === $event.target);
        if (button) this.toggle(button, answer);
        console.log(this.examService.results.value.map(result => result.answered));
      } else {
        // @ts-ignore
        this.slideButtons.find((element: any) => element.dom === $event.target).active = false;
        this.response = this.slide.content.options.find((option: Option) => option.value === answer).response;
        this.isCorrect = this.answers.includes(answer);
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
    this.updateUI();
  }

  markAsComplete(button: EventTarget): void {
    this.slideButtons.forEach(button => {
      if (button.active) this.slideService.markAsDisabled(button.dom);
    });
    this.isCompleted = true;
    this.slideService.markAsCorrect(button);
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

  //exam methods =================================================
  toggle(button: SlideButton, answer: string): void {
    console.log('yo?');

    const results = this.examService.results.value;
    if (button.active) {
      console.log('was active');
      this.slideService.markAsSelected(button.dom);
      results[this.slideService.markerIndex - 1].answered.push(answer);
    } else {
      console.log('was inactive');
      this.slideService.markAsUnselected(button.dom);
      results[this.slideService.markerIndex - 1].answered =
        results[this.slideService.markerIndex - 1].answered.filter(a => a !== answer);
    }
    this.examService.next(results);
    // @ts-ignore
    this.slideButtons.find((element: any) => element.dom === button.dom).active = !button.active;
  }
}

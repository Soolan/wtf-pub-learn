import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {FADE_IN_OUT} from '../../../../../../shared/animations/fade-in-out';
import {SLIDE_UP} from '../../../../../../shared/animations/slide-up';
import {Position} from '../../../../../../shared/data/enums';
import {OptionSet, Option, SlideButton} from '../../../../../../shared/models/slide';
import {SlideService} from '../slide.service';
import {SLIDE_LEFT} from '../../../../../../shared/animations/slide-left';
import {ExamService} from '../exam.service';

@Component({
  selector: 'app-single-choice',
  templateUrl: './single-choice.component.html',
  styleUrls: ['./single-choice.component.scss', '../slide.scss'],
  animations: [SLIDE_LEFT, SLIDE_UP, FADE_IN_OUT],
})
export class SingleChoiceComponent implements OnInit, AfterViewInit {
  @Input() slide: any;
  @ViewChild('optionSet') optionSetRef!: ElementRef;

  position: any = Position;
  answer: string = '';
  options: string[] = [];
  set!: OptionSet;
  response = '';
  isCorrect = false;
  isCompleted = false;
  slideButtons: SlideButton[] = [];

  constructor(private examService: ExamService, private slideService: SlideService) {
  }

  ngOnInit(): void {
    this.reset();
    this.initOptionSet();
  }

  ngAfterViewInit(): void {
    if (this.optionSetRef) {
      for (let child of this.optionSetRef.nativeElement.children) {
        this.slideService.resetButtonStyles(child);
        this.slideButtons.push({dom: child, active: true})
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
      if (this.examService.results.value) {
        const button = this.slideButtons.find((element: any) => element.dom === $event.target);
        if (button) this.toggle(button, answer);
        console.log(this.examService.results.value[0]);
      } else {
        // @ts-ignore
        this.slideButtons.find((element: any) => element.dom === $event.target).active = false;
        this.isCorrect ? this.markAsComplete($event.target) : this.slideService.markAsIncorrect($event.target);
      }
    }

    this.response = this.slide.content.options.find((option: Option) => option.value === answer).response;
    this.updateUI();
  }

  markAsComplete(button: EventTarget) {
    this.slideButtons.forEach(button => {
      if (button.active) this.slideService.markAsDisabled(button.dom);
    });
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

  //exam methods =================================================
  toggle(button: SlideButton, answer: string): void {
    const results = this.examService.results.value;
    if (button.active) {
      this.unselectOthers();
      this.slideService.markAsExamSelected(button.dom);
      results[this.slideService.markerIndex - 1].answered = answer;
    } else {
      this.slideService.markAsExamUnselected(button.dom);
      results[this.slideService.markerIndex - 1].answered = '';
    }
    this.examService.next(results);
    // @ts-ignore
    this.slideButtons.find((element: any) => element.dom === button.dom).active = !button.active;
  }

  unselectOthers(): void {
    this.slideButtons = [];
    for (let child of this.optionSetRef.nativeElement.children) {
      this.slideService.markAsExamUnselected(child);
      this.slideButtons.push({dom: child, active: true})
    }
  }
}

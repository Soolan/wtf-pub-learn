import {Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {OptionSet, Option} from '../../../../../../shared/models/slide';
import {SlideService} from '../slide.service';
import {FADE_IN_OUT} from '../../../../../../shared/animations/fade-in-out';

@Component({
  selector: 'app-fixed-fill-in',
  templateUrl: './fixed-fill-in.component.html',
  styleUrls: ['./fixed-fill-in.component.scss', '../slide.scss'],
  animations: [FADE_IN_OUT]
})
export class FixedFillInComponent implements OnChanges {
  @Input() slide!: any;
  @ViewChild('optionSet') optionSetRef!: ElementRef;

  blank: any = null;
  answer = '';
  options: string[] = [];
  set!: OptionSet;
  currentSet = 0;
  response = '';
  isCorrect!: boolean;
  isCompleted = false;

  constructor(private slideService: SlideService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.response = '';
    this.answer = this.slide.content.answer;
    this.initOptionSet();
    this.resetButtons();
  }

  private resetButtons() {
    if (this.optionSetRef) {
      for (let child of this.optionSetRef.nativeElement.children) {
        this.slideService.resetButtonStyles(child);
      }
    }
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
    this.response = this.slide.content.options.find((option: Option) => option.value === answer).response;
    this.updateUI();
    this.blank = document.getElementsByClassName('blank1')[0];
    this.isCorrect = this.answer === answer;
    if ($event.target) {
      this.isCorrect ? this.markAsComplete($event.target, answer) : this.slideService.markAsIncorrect($event.target);
    }
  }

  markAsComplete(button: EventTarget, answer: string) {
    this.slideService.fillBlank(this.blank, answer);
    this.set.isActive = false; // fadeout
    this.isCompleted = true;
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

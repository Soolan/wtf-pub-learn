import {Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {FADE_IN_OUT} from '../../../../../../shared/animations/fade-in-out';
import {OptionSet, Option} from '../../../../../../shared/models/slide';
import {SlideService} from '../slide.service';

@Component({
  selector: 'app-fixed-fill-in',
  templateUrl: './fixed-fill-in.component.html',
  styleUrls: ['./fixed-fill-in.component.scss', '../slide.scss'],
  animations: [FADE_IN_OUT]
})
export class FixedFillInComponent implements OnChanges {
  @Input() slide!: any;
  @ViewChild('scenario') scenarioRef!: ElementRef;
  @ViewChild('optionSet') optionSetRef!: ElementRef;

  blank: any = null;
  answer = '';
  options: string[] = [];
  set!: OptionSet;
  currentSet = 0;
  response = '';
  isCorrect!: boolean;
  isCompleted = false;
  shakeState!: string;

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
    this.blank = this.scenarioRef.nativeElement.children['blank0'];
    this.isCorrect = this.answer === answer;
    this.shakeState = this.isCorrect ? 'still' : 'shake';
    if ($event.target) {
      this.isCorrect ? this.markAsComplete($event.target, answer) : this.slideService.markAsIncorrect($event.target);
    }
    this.response = this.slide.content.options.find((option: Option) => option.value === answer).response;
    this.updateUI();
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
    setTimeout(_ => this.shakeState = 'still', 100);
  }
}

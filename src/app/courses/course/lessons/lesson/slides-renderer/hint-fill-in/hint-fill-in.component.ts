import {Component, ElementRef, Input, OnChanges, Renderer2, SimpleChanges, ViewChild} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup} from '@angular/forms';
import {SlideService} from '../slide.service';
import {Position} from '../../../../../../shared/data/enums';
import {SLIDE_UP} from '../../../../../../shared/animations/slide-up';
import {POSITIONS} from '../../../../../../shared/data/generic';

@Component({
  selector: 'app-hint-fill-in',
  templateUrl: './hint-fill-in.component.html',
  styleUrls: ['./hint-fill-in.component.scss', '../slide.scss'],
  animations: [SLIDE_UP]
})
export class HintFillInComponent implements OnChanges {
  @Input() slide: any;
  @ViewChild('blank_div') blankDivRef!: ElementRef;
  @ViewChild('blank_field') blankFieldRef!: ElementRef;
  @ViewChild('top') topRef!: ElementRef;
  @ViewChild('left') leftRef!: ElementRef;
  @ViewChild('right') rightRef!: ElementRef;
  @ViewChild('bottom') bottomRef!: ElementRef;

  blank: any = null;
  form: UntypedFormGroup;
  answer = '';
  isCorrect = false;
  isCompleted = false;
  showHint = false;
  position = Position;

  constructor(
    private slideService: SlideService,
    private formBuilder: UntypedFormBuilder,
    private renderer: Renderer2,
  ) {
    this.form = this.formBuilder.group({blank_field: null});
    this.slideService.ui.subscribe({
      // keep the focus on input after clicking on the hint button
      next: data => this.blankDivRef.nativeElement.children['input_field'].focus(),
      error: error => console.log(error)
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    this.reset();
    this.answer = this.slide.content.answer;
    this.checkOnKeyStroke();
    setTimeout(() => {
      this.blank = this.getBlankBox(this.slide.content.position)
      this.initInputField();
      }, 700)
  }

  getBlankBox(position: number): any {
    let element: any = null;
    const id = POSITIONS[position];
    switch (position) {
      case 0: element = this.topRef.nativeElement.children[id];    break;
      case 1: element = this.bottomRef.nativeElement.children[id]; break;
      case 2: element = this.leftRef.nativeElement.children[id];   break;
      case 3: element = this.rightRef.nativeElement.children[id];  break;
      default: console.log('u mad!? o,O'); break;
    }
    return element;
  }

  initInputField() {
    this.renderer.setStyle(this.blankDivRef.nativeElement, 'display', 'inline-block');
    this.renderer.setStyle(this.blankDivRef.nativeElement, 'top', this.blank.offsetTop + 5 + 'px');
    this.renderer.setStyle(this.blankDivRef.nativeElement, 'left', this.blank.offsetLeft + 'px');
    this.blankDivRef.nativeElement.children['input_field'].focus();
  }

  checkOnKeyStroke() {
    this.form.controls['blank_field'].valueChanges.subscribe(value => {
      console.log(this.answer, value);

      if (value === this.answer && !this.isCorrect) {
        this.markAsComplete();
      }
      let color = this.answer.startsWith(value) ? 'var(--color-primary-light)' : 'var(--color-warn)';
      this.renderer.setStyle(this.blankFieldRef.nativeElement, 'color', color);
    });
  }

  markAsComplete() {
    this.isCorrect = true;
    this.isCompleted = true;
    this.renderer.setStyle(this.blankDivRef.nativeElement, 'display', 'none');
    this.slideService.fillBlank(this.blank, this.answer);
    this.slideService.next({
      marker: this.slideService.markerIndex,
      action: this.slideService.actionMessage,
      response: '',
      correct: this.isCorrect,
      completed: this.isCompleted
    })
  }

  reset(): void {
    this.form.reset();
    this.blank = null;
    this.answer = '';
    this.isCorrect = false;
    this.showHint = false;
  }
}

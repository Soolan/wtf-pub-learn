import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild
} from '@angular/core';
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
export class HintFillInComponent implements OnInit, AfterViewInit {
  @Input() slide: any;

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
  }

  ngOnInit(): void {
    this.reset();
    this.answer = this.slide.content.answer;
    this.checkOnKeyStroke();
  }

  ngAfterViewInit() {
    this.blank = document.getElementById('blank-span');
    // console.log(this.blank.offsetTop, this.blank.offsetLeft);
    this.initInputField();
    this.slideService.ui.subscribe({
      // keep the focus on input after clicking on the hint button
      next: data => console.log(data), // this.blankDivRef.nativeElement.children['input_field'].focus(),
      error: error => console.log(error)
    })
  }

  initInputField() {
    this.blank.addChild()
    const input = document.getElementById('input-field');
    input?.setAttribute('formControlName', 'blank_field');
    input?.focus();
  }

  checkOnKeyStroke() {
    this.form.controls['blank_field'].valueChanges.subscribe(value => {
      console.log('yyy')
      if (value === this.answer && !this.isCorrect) {
        this.markAsComplete();
      }
      let color = this.answer.startsWith(value) ? 'var(--color-primary-light)' : 'var(--color-warn)';
      // this.renderer.setStyle(this.blankFieldRef.nativeElement, 'color', color);
    });
  }

  markAsComplete() {
    this.isCorrect = true;
    this.isCompleted = true;
    // this.renderer.setStyle(this.blankDivRef.nativeElement, 'display', 'none');
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

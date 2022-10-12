import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {BLANK_PLACEHOLDER} from '../../../../../../../shared/data/generic';
import {SlideService} from '../../slide.service';
import {UntypedFormBuilder, UntypedFormGroup} from '@angular/forms';
import {Position} from '../../../../../../../shared/data/enums';

@Component({
  selector: 'app-blank-renderer',
  templateUrl: './blank-renderer.component.html',
  styleUrls: ['./blank-renderer.component.scss', '../../slide.scss']
})
export class BlankRendererComponent implements OnInit, AfterViewInit {
  @Input() scenario!: string;
  @Input() answer!: string;
  @ViewChild('input_field') input!: ElementRef;
  @ViewChild('input_span') span!: ElementRef;

  chunks!: string[];
  form: UntypedFormGroup;
  isCorrect = false;
  isCompleted = false;
  showHint = false;
  position = Position;

  constructor(
    private slideService: SlideService,
    private formBuilder: UntypedFormBuilder,
  ) {
    this.form = this.formBuilder.group({blank_field: null});
  }

  ngOnInit(): void {
    this.reset();
    this.chop();
    this.checkOnKeyStroke();
  }

  ngAfterViewInit(): void {
    this.input.nativeElement.focus()
  }

  reset(): void {
    this.form.reset();
    this.isCorrect = false;
    this.showHint = false;
  }

  chop(): void {
    this.chunks = this.scenario.split(BLANK_PLACEHOLDER);
    if(this.scenario.startsWith(BLANK_PLACEHOLDER)) {
      this.chunks.unshift(BLANK_PLACEHOLDER);   // insert to the beginning of array
    } else if(this.scenario.endsWith(BLANK_PLACEHOLDER)) {
      this.chunks.push(BLANK_PLACEHOLDER);   // insert at the end of array
    } else {
      this.chunks.splice(1, 0, BLANK_PLACEHOLDER); // insert at index 1
    }
  }

  checkOnKeyStroke() {
    this.form.controls['blank_field'].valueChanges.subscribe(value => {
      console.log(value);
      if (value === this.answer && !this.isCorrect) {
        this.markAsComplete();
      }
      this.input.nativeElement.style.color = this.answer.startsWith(value) ?
        'var(--color-primary-light)' :
        'var(--color-warn)';
      });
  }

  markAsComplete() {
    this.isCorrect = true;
    this.isCompleted = true;
    this.input.nativeElement.style.display = 'none';
    this.slideService.fillBlank(this.span.nativeElement, this.answer);
    this.slideService.next({
      marker: this.slideService.markerIndex,
      action: this.slideService.actionMessage,
      response: '',
      correct: this.isCorrect,
      completed: this.isCompleted
    })
  }

  get blank(): string {
    return BLANK_PLACEHOLDER;
  }
}

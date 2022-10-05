import {Component, Input, OnInit} from '@angular/core';
import {BLANK_PLACEHOLDER} from '../../../../../../../shared/data/generic';
import {SlideService} from '../../slide.service';
import {UntypedFormBuilder, UntypedFormGroup} from '@angular/forms';
import {Position} from '../../../../../../../shared/data/enums';

@Component({
  selector: 'app-blank-renderer',
  templateUrl: './blank-renderer.component.html',
  styleUrls: ['./blank-renderer.component.scss']
})
export class BlankRendererComponent implements OnInit {
  @Input() scenario!: string;
  @Input() answer!: string;
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
    this.chunks = this.scenario.split(BLANK_PLACEHOLDER);
    console.log(this.chunks, this.scenario)
    this.checkOnKeyStroke();
    this.slideService.ui.subscribe({
      // keep the focus on input after clicking on the hint button
      next: data => console.log(data), // this.blankDivRef.nativeElement.children['input_field'].focus(),
      error: error => console.log(error)
    })
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
    this.isCorrect = false;
    this.showHint = false;
  }

  get blank(): string {
    return BLANK_PLACEHOLDER;
  }

}

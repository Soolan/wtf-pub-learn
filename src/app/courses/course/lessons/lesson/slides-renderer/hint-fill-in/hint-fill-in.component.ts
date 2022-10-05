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

  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit() { }

  get position(): any {
    return Position;
  }
}

import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {Position} from '../../../../../../shared/data/enums';
import {SLIDE_UP} from '../../../../../../shared/animations/slide-up';

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

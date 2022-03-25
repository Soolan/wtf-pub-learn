import {Component, Input, OnInit} from '@angular/core';
import {Position} from '../../../../../../shared/data/enums';

@Component({
  selector: 'app-text-image',
  templateUrl: './text-image.component.html',
  styleUrls: ['./text-image.component.scss']
})
export class TextImageComponent implements OnInit {
  @Input() content!: any;
  position = Position;

  constructor() { }

  ngOnInit(): void {
  }

}

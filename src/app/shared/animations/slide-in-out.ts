import {animate, state, style, transition, trigger} from '@angular/animations';

export const SLIDE_IN_OUT = trigger('slideInOut', [
  transition(':enter', [
    style({transform: 'translateX(100%)'}),
    animate('200ms ease-in', style({transform: 'translateX(0%)'}))
  ]),
  transition(':leave', [
    animate('200ms ease-in', style({transform: 'translateX(100%)'}))
  ])
])

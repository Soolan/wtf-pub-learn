import {animate, style, transition, trigger} from '@angular/animations';

export const SLIDE_DOWN = trigger('slideDown', [
  transition(':enter', [
    style({ transform: 'translateY(-25%)'}),
    animate('500ms ease-in', style({transform: 'translateY(0%)', opacity: 1}))
  ]),
  transition(':leave', [
    animate('500ms ease-in', style({transform: 'translateY(25%)', opacity: 0}))
  ])
])

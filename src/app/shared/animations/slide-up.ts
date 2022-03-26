import {animate, keyframes, style, transition, trigger} from '@angular/animations';

export const SLIDE_UP = trigger('slideUp', [
  transition(':enter', [
    style({ transform: 'translateY(100%)',  opacity: 0}),
    animate('450ms ease-in', keyframes([
      style({transform: 'translateY(-20%)', opacity: 0.7, offset:0.4}),
      style({transform: 'translateY(10%)', opacity: 0.8, offset:0.7}),
      style({transform: 'translateY(-5%)', opacity: 0.9, offset:0.9}),
      style({transform: 'translateY(0%)', opacity: 1, offset:1}),
    ]))
  ]),
  transition(':leave', [
    animate('200ms ease-in', style({transform: 'translateY(-100%)', opacity: 0}))
  ])
])


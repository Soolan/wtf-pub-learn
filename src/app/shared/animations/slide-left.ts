import {animate, keyframes, style, transition, trigger} from '@angular/animations';

export const SLIDE_LEFT = trigger('slideLeft', [
  transition(':enter', [
    style({transform: 'translateX(100%)', opacity: 0}),
    animate('200ms ease-in', keyframes([
      style({transform: 'translateX(0%)', opacity: 1, offset: 1}),
    ])),
  ]),
  transition(':leave', [
    animate('200ms ease-in', style({transform: 'translateX(-100%)', opacity: 0, offset: 1}))
  ])
])

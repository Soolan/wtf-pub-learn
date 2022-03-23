import {animate, keyframes, style, transition, trigger} from '@angular/animations';

export const STRETCH = trigger('stretchUpOut', [
  transition(':enter', [
    style({transform: 'translateY(100%)', opacity: 0}),
    animate('200ms ease-in', keyframes([
      style({transform: 'translateY(-10%)', opacity: 0.5, offset: 0.5}),
      style({transform: 'translateY(10%)', opacity: 0.75, offset: 0.75}),
      style({transform: 'translateY(0%)', opacity: 1, offset: 1}),
    ]))
  ]),
  transition(':leave', [
    animate('200ms ease-in', style({transform: 'translateY(100%)', opacity: 0}))
  ])
])

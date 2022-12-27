import {animate, keyframes, style, transition, trigger} from '@angular/animations';

export const FADE_IN_OUT = trigger('fadeInOut', [
  transition(':enter', [
    style({opacity: 0}),
    animate('200ms ease-in', keyframes([
      style({opacity: 1, offset: 1}),
    ])),
  ]),

  transition(':leave', [
    style({opacity: 1}),
    animate('200ms ease-out', keyframes([
      style({opacity: 0, offset: 1}),
    ]))
  ])
]);

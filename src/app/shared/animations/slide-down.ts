import {animate, state, style, transition, trigger} from '@angular/animations';

export const SLIDE_DOWN = trigger('slideDown', [
  transition(':enter', [
    style({ transform: 'translateY(-50%)'}),
    animate('500ms ease-in', style({transform: 'translateY(0%)', opacity: 1}))
  ]),
  // transition(':leave', [
  //   animate('500ms ease-in', style({transform: 'translateY(25%)', opacity: 0}))
  // ])

  state('slideDown', style({transform: 'translateY(25%)', opacity: 1})),

  transition('* => slideDown', [
    animate('1s')
  ]),
])

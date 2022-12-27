import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';

export const FADE_IN_OUT = trigger('fadeInOut', [
  // state('fadeIn', style({opacity: 1})),
  // state('fadeOut', style({opacity: 0})),

  // transition('* => fadeIn', [
  //   animate('0.5s')
  // ]),

  transition ( ':enter', [
    style({ opacity: 0}),
    animate('300ms ease-in', style({opacity: 1}))
  ]),

  // transition('fadeIn => fadeOut', [
  //   animate('1s')
  // ]),
]);


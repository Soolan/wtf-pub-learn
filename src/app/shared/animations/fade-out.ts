import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';

export const FADE_OUT = trigger('fadeInOut', [
  state('fadeIn', style({opacity: 1})),
  state('fadeOut', style({opacity: 0})),

  transition('* => fadeIn', [
    animate('0.4s 0s ease-in',
      keyframes([
        style({
          opacity: 0,
          offset: 0
        }),
        style({
          opacity: 1,
          offset: 1
        })
      ]))
  ]),


  transition('* => fadeOut', [
    animate('1s')
  ]),
]);


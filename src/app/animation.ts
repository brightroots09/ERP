import { trigger, state, style, transition, animate, stagger, keyframes, query } from '@angular/animations';

export let staggerAnimate = trigger('fade', [
    transition('* => *', [
      query('*', style({ opacity: 0 }), {optional: true}),
      query('*', stagger('300ms', [
        animate('1s ease-in-out', keyframes([
          style({opacity: 0, transform: 'translate(-75px)', offset: 0}),
          style({opacity: .5, transform: 'translate(35px)', offset: 0.3}),
          style({opacity: 1, transform: 'translate(0)', offset: 1})
        ]))
      ]))
    ])
  ])
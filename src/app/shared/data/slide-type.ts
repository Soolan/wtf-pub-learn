import {SlideDetails} from '../models/slide';
import {Position} from './enums';

export enum SlideType {
  Start,
  Static,
  FixedFillIn,
  MixedFillIn,
  HintFillIn,
  SingleChoice,
  MultipleChoice,
  Swipe,
  Match,
  EasyReview,
  HardReview,
  Summary
}

export const SLIDE_DETAILS: SlideDetails[] = [
  {name: 'Start', type:SlideType.Start, description: 'The starting slides with bullets'},
  {name: 'Static', type:SlideType.Start, description: 'Some static text + image'},
  {name: 'Fixed Fill In', type:SlideType.Start, description: 'Fixed number of answers to fill the blanks.'},
  {name: 'Mixed Fill In', type:SlideType.Start, description: 'Answers for each blank are refreshed.'},
  {name: 'Hint Fill In', type:SlideType.Start, description: 'Type in blanks with provided hint on demand.'},
  {name: 'Single Choice', type:SlideType.Start, description: 'Radio button answer.'},
  {name: 'Multiple Choice', type:SlideType.Start, description: 'Checkbox answers.'},
  {name: 'Swipe', type:SlideType.Start, description: 'Swipe cards left or right.'},
  {name: 'Match', type:SlideType.Start, description: 'match fixed answers to fixed questions'},
  {name: 'Easy Review', type:SlideType.Start, description: 'Mid lesson quiz with fixed/hint fill ins and single/multiple choices .'},
  {name: 'Hard Review', type:SlideType.Start, description: 'End lesson quiz with mixed fill ins + match + swipe'},
  {name: 'Summary', type:SlideType.Start, description: 'Keywords of what we learned.'},
];

export const POSITIONS: any[] = [
  {name: 'top', value: Position.Top},
  {name: 'bottom', value: Position.Bottom},
  {name: 'left', value: Position.Left},
  {name: 'right', value: Position.Right},
];

export const OPTIONS_BREAKPOINT: number = 25;
export const BLANK_PLACEHOLDER: string = "------";
export const BLANK_SPACES: string[] = ['start', 'end'];

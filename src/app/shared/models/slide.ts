import {SlideType} from '../data/enums';

export interface Slide {
  type: SlideType;
  order: number;
  content: {};
}

export interface SlideImage {
  order: number;
  url: string;
}

export interface SlideButton {
  dom: any;
  active: boolean;
}

export interface OptionSet {
  isActive: boolean;
  isSingle: boolean;
  options: string[];
}

export interface Answer {
  answer: string;
}

export interface Card {
  question: string;
  answer: string;
}

export interface Option {
  value: string;
  response: string;
}

export interface Style {
  name: string;
  value: string;
}

export interface SlideDetails {
  name: string;
  type: SlideType;
  description: string;
}

export interface SlideHeaderFooter {
  marker: number;    //-------header
  action: string;
  response: string;  //-------footer
  correct: boolean;
  completed: boolean;
  reload?: boolean;
}

export interface TransX {
  left: string;
  right: string;
}

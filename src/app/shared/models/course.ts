import {Timestamps} from './timestamps';
import {SlideType} from '../data/enums';

export interface Course {
  name: string;
  order: number;
  avatar: string;
  description: string;
  lessons: Lesson[];
  timestamps: Timestamps;
}

export interface Lesson {
  name: string;
  order: number;
  description: string;
  start_here: string;  // start slide ref
  slides: Slide[];
  timestamps: Timestamps;
}

export interface Slide {
  type: SlideType;
  order: number;
  content: {};
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

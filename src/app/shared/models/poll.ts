import {Timestamps} from './timestamps';

export interface Poll {
  question: string;
  votes: Vote[];
  timestamps: Timestamps;
}

export interface Vote {
  option: string;
  count: number;
}

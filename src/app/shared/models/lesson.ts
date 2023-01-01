import {Timestamps} from './timestamps';
import {Balance} from './balance';

export interface Lesson {
  name: string;
  avatar: string;
  description: string;
  published: boolean;
  isPaid: boolean;
  payOptions: Balance[];
  timestamps: Timestamps;
  order: number;
}

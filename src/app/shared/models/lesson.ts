import {Timestamps} from './timestamps';

export interface Lesson {
  name: string;
  avatar: string;
  description: string;
  published: boolean;
  timestamps: Timestamps;
  order: number;
}

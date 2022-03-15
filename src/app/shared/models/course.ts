import {Timestamps} from './timestamps';

export interface Course {
  name: string;
  avatar: string;
  description: string;
  published: boolean;
  timestamps: Timestamps;
}

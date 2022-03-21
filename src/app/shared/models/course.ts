import {Timestamps} from './timestamps';
import {Status} from '../data/enums';

export interface Course {
  name: string;
  image: string;
  avatar: string;
  description: string;
  published: boolean;
  level: number;
  tags: string;
  timestamps: Timestamps;
}

export interface Progress {
  status: Status;
  course_id: string;
  lesson: string;
  slide: number;
  score: number;
  updated_at: number;
}

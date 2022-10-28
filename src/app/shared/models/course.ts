import {Timestamps} from './timestamps';
import {Status} from '../data/enums';

export interface Course {
  name: string;
  banner: string;
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
  lessons: LessonProgress[];
  grade: number;
}

export interface LessonProgress {
  lesson_id: string;
  slide: number;
  score: number;
  updated_at: number;
}

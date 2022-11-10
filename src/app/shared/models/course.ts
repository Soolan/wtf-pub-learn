import {Timestamps} from './timestamps';

export interface Course {
  name: string;
  banner: string;
  avatar: string;
  description: string;
  published: boolean;
  level: number;
  tags: string;
  timestamps: Timestamps;
  stats: number[]; // each element index represent a lesson.
}                  // each element value represent slides count in that lesson.
                   // for example stats = [12, 18] means:
                   // this course has two lessons
                   // lesson 1 has 12 slides
                   // lesson 2 has 18 slides




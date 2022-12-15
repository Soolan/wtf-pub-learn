import {Timestamps} from './timestamps';
import {PayOption} from './pay-option';

export interface Course {
  name: string;
  banner: string;
  avatar: string;
  description: string;
  published: boolean;
  has_exam: boolean;
  has_certificate: boolean;
  paid: boolean;
  pay_options: PayOption[],
  level: number;
  tags: string;
  timestamps: Timestamps;
  stats: number[]; // each element index represent a lesson.
}                  // each element value represent slides count in that lesson.
                   // for example stats = [12, 18] means:
                   // this course has two lessons
                   // lesson 1 has 12 slides
                   // lesson 2 has 18 slides




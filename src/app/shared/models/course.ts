import {Timestamps} from './timestamps';
import {PayOption} from './pay-option';
import {Difficulty} from '../data/enums';

export interface Course {
  name: string;
  banner: string;
  avatar: string;
  description: string;
  published: boolean;
  isPaid: boolean;
  payOptions: PayOption[];
  hasExam: boolean;
  paidExam: boolean;
  examPayOptions: PayOption[];
  hasCertificate: boolean;
  paidCertificate: boolean;
  certificatePayOptions: PayOption[];
  level: Difficulty;
  tags: string;
  timestamps: Timestamps;
  stats: number[]; // each element index represent a lesson.
}                  // each element value represent slides count in that lesson.
                   // for example stats = [12, 18] means:
                   // this course has two lessons
                   // lesson 1 has 12 slides
                   // lesson 2 has 18 slides




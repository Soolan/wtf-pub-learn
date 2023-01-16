import {Timestamps} from './timestamps';
import {CertLayout, Difficulty} from '../data/enums';
import {Balance} from './balance';

export interface Course {
  name: string;
  banner: string;
  avatar: string;
  description: string;
  published: boolean;
  hasExam: boolean;
  paidExam: boolean;
  examPayOptions: Balance[];
  certLayout: CertLayout;
  hasNftCert: boolean;
  paidNftCert: boolean;
  nftCertPayOptions: Balance[];
  level: Difficulty;
  tags: string;
  timestamps: Timestamps;
  stats: number[]; // each element index represent a lesson.
}                  // each element value represent slides count in that lesson.
                   // for example stats = [12, 18] means:
                   // this course has two lessons
                   // lesson 1 has 12 slides
                   // lesson 2 has 18 slides




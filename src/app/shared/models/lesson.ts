import {Timestamps} from './timestamps';
import {PayOption} from './pay-option';

export interface Lesson {
  name: string;
  avatar: string;
  description: string;
  published: boolean;
  paidLesson: boolean;
  lessonPayOptions: PayOption[];
  timestamps: Timestamps;
  order: number;
}

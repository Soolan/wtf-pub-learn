import {Timestamps} from './timestamps';
import {Achievement, Activity, Loyalty} from '../data/profile';
import {Status} from '../data/enums';

export interface Profile {
  display_name: string;
  avatar: string;
  firstname: string;
  lastname: string;
  wallet_address: string;
  loyalty: Loyalty;
  achievements: Achievement[];
  timestamps: Timestamps;
}

export interface UserActivity {
  ip: string;
  code: Activity;
}

export interface Progress {
  status: Status;
  lessons: LessonProgress[];
}

export interface LessonProgress {
  lesson_id: string;
  current_slide: number;
  total_slides: number;
  slide_id: string;
  status: Status;
  score: number;
  updated_at: number;
}

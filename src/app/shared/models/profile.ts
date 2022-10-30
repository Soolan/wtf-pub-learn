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

export interface Course {
  name: string;
  info: Info;
}

export interface Lesson {
  name: string;
  info: Info;
  current_slide: number;
  total_slides: number;
  slide_id: string;
}

export interface Info {
  status: Status;
  score: number;
  updated_at: number;
}

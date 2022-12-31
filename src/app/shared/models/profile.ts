import {Timestamps} from './timestamps';
import {Achievement, Activity, Loyalty} from '../data/profile';
import {Status} from '../data/enums';
import {Balance} from './balance';

export interface Profile {
  display_name: string;
  avatar: string;
  firstname: string;
  lastname: string;
  wallet_address: string;
  tag: string;
  balances: Balance[];
  loyalty: Loyalty;
  achievements: string;
  suspended: boolean;
  timestamps: Timestamps;
}

export interface UserActivity {
  ip: string;
  code: Activity;
}

export interface Course {
  paid?: string;
  name: string;
  info: Info;
}

export interface Lesson {
  paid?: string;
  name: string;
  current_slide: number;
  info: Info;
}

export interface Info {
  status: Status;
  score: number;
  updated_at: number;
}

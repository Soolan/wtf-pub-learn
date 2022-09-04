import {Timestamps} from './timestamps';
import {Achievement, Activity, Loyalty} from '../data/profile';

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







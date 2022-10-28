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
}

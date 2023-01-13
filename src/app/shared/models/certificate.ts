import {CertLayout} from '../data/enums';

export interface Certificate {
  courseId: string;
  courseName: string;
  userId: string;
  fullName: string;
  grade: number;
  timestamp: number;
  certificateId: string;
  courseCreator: Creator;
  present: Present;
  layout: CertLayout;
}

export interface Creator {
  fullName: string;
  profession: string;
}

export interface Present {
  headline: string;
  description: string;
}

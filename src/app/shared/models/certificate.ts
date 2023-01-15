import {CertLayout} from '../data/enums';

export interface Certificate {
  courseId: string;
  courseName: string;
  userId: string;
  fullName: string;
  grade: number;
  timestamp: number;
  verificationId: string;
  courseCreator: Creator; // The dude who signs the certificate
  present: Present;
  layout: CertLayout;
}

export interface Creator {
  fullName: string;
  profession: string;
}

export interface Present {
  headline: string;     // i.e. proudly presented to
  description: string;  // i.e. Jon Snow successfully completed ...
}

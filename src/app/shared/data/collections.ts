import {Collection} from '../models/collection';
import {Position, SlideType, WtfProduct} from './enums';

//------------------------------------------------- Releases
export const RELEASES: Collection = {
  path: 'releases',
  limit: 50,
  where: {field: 'product', operator: '==', value: WtfProduct.Learn},
  orderBy: {field: 'date', direction: 'desc'}
};

//------------------------------------------------- Polls
export const POLLS: Collection = {
  path: 'polls',
  limit: 1,
  where: {field: 'timestamp.deleted_at', operator: '==', value: 0},
};

//------------------------------------------------- PROFILES
export const PROFILES: Collection = {
  path: 'profiles',
  limit: 1,
  where: {field: 'created_at', operator: '!=', value: null}
};

//------------------------------------------------- Transactions
export const TRANSACTIONS: Collection = {
  path: 'transactions',
  limit: 50,
  where: {field: 'timestamp', operator: '!=', value: null},
  orderBy: {field: 'timestamp', direction: 'desc'}
};

//------------------------------------------------- P_COURSES
export const P_COURSES: Collection = {
  path: 'courses',
  limit: 25,
  where: {field: 'name', operator: '!=', value: null}
};

//------------------------------------------------- P_LESSONS
export const P_LESSONS: Collection = {
  path: 'lessons',
  limit: 25,
  where: {field: 'name', operator: '!=', value: null}
};

//------------------------------------------------- Course
export const COURSES: Collection = {
  path: 'courses',
  limit: 6,
  where: {field: 'timestamps.created_at', operator: '!=', value: null},
  orderBy: {field: 'timestamps.created_at', direction: 'desc'}
};

//------------------------------------------------- Lesson
export const LESSONS: Collection = {
  path: 'lessons',
  limit: 6,
  where: {field: 'published', operator: '==', value: true},
  orderBy: {field: 'order', direction: 'asc'}
};

//------------------------------------------------- Slide
export const SLIDES: Collection = {
  path: 'slides',
  limit: 35,
  where: {field: 'order', operator: '!=', value: ''},
  orderBy: {field: 'order', direction: 'asc'}
};

//------------------------------------------------- Event
export const EVENTS: Collection = {
  path: 'events',
  limit: 15,
  where: {field: 'created_at', operator: '!=', value: ''},
  orderBy: {field: 'created_at', direction: 'desc'}
};

//------------------------------------------------- Certificate
export const CERTIFICATES: Collection = {
  path: 'certificates',
  limit: 10,
  where: {field: 'timestamp', operator: '!=', value: ''},
  orderBy: {field: 'timestamp', direction: 'desc'}
};

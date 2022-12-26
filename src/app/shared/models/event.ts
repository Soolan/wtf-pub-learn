import {EventType} from '../data/enums';

export interface Event {
  type: EventType,
  description: string,
  icon: string
}

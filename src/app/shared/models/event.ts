import {EventType} from '../data/enums';

export interface Event {
  type: EventType,
  who: string,     // obfuscated display name/email ip  i.e. so*****@gmail.com,[257.167.23.58],
  created_at: number
}

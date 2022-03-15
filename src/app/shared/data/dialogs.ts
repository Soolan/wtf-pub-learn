import {DialogData} from '../models/dialog-data';

export const DELETE: DialogData = {
  heading: 'This document will be eliminated.',
  subHeading: 'Proceed?',
  actions: [
    {label: 'Delete', icon: 'delete'},
    {label: 'Cancel', icon: 'close'},
  ]
};

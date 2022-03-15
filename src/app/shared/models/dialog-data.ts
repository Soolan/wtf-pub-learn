export interface DialogData {
  heading: string;
  subHeading: string;
  actions: Button[];
}

export interface Button {
  label: string;
  icon: string;
}

export interface FormField {
  label: string;
  name: string;
}

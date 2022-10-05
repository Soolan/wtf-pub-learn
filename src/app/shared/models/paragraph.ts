export interface Paragraph {
  content: string;
  bold: string;
  italic: string;
  url: Url;
  tooltip: Tooltip;
}

export interface Url {
  caption: string;
  link: string;
}

export interface Tooltip {
  caption: string;
  description: string;
}

export interface Chunk {
  value: string,
  flag: ChunkFlags
}

export enum ChunkFlags {
  Normal,
  Bold,
  Italic,
  BoldItalic,
  UrlCaption,
  UrlLink,
  TooltipCaption,
  TooltipInfo
}

export const PARSER_CSS = {
  BOLD: "parser-bold",
  ITALIC: "parser-italic",
  BOLD_ITALIC: "parser-bold-italic",
  URL_CAPTION: "parser-url-caption",
  TOOLTIP_CAPTION: "parser-tooltip-caption",
  TOOLTIP_INFO: "parser-tooltip-info",
}

export const REGEX = {
  BOLD: /\*\*(.*?)\*\*/gm,                // **word**
  ITALIC: /\~\~(.*?)\~\~/gm,              // ~~word~~
  BOLD_ITALIC: /\*\~\*(.*?)\*\~\*/gm,     // *~*word*~*
  URL: /\[(.*?)\]\((https:\/\/.*?)\)/gm,  // [caption](link)
  TOOLTIP: /\[([^\[]+)\]\<(.*)\>/gm,      // [caption]<description>
}

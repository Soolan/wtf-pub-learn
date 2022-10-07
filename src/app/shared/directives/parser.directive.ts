import {Directive, ElementRef, Input, Renderer2} from '@angular/core';

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

export interface Chunk {
  value: string,
  flag: ChunkFlags
}

export const PARSER_CSS = {
  BOLD: "parser-bold",
  ITALIC: "parser-italic",
  BOLD_ITALIC: "parser-bold-italic",
  URL_CAPTION: "parser-url-caption",
  URL_LINK: "parser-url-link",
  TOOLTIP_CAPTION: "parser-tooltip-caption",
  TOOLTIP_INFO: "parser-tooltip-info",
}

@Directive({
  selector: '[appParser]'
})

export class ParserDirective {
  @Input() paragraph!: string;
  chunks: Chunk[] = [];
  index = 0;
  boldRegex = /\*\*(.*?)\*\*/gm;
  italicRegex = /\~\~(.*?)\~\~/gm;
  boldItalicRegex = /\*\~\*(.*?)\*\~\*/gm;
  urlRegex = /\[(.*?)\]\((https:\/\/.*?)\)/gm;
  tooltipRegex = /\[([^\[]+)\](\<.*\>)/gm;

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
  ) {
  }

  ngOnInit(): void {
    this.cleanUp();
    this.parse();
    setTimeout(_ => {
      this.render();
    }, 100)
  }

  cleanUp(): void {
    Array.from(this.elementRef.nativeElement.children).forEach(
      child => this.renderer.removeChild(this.elementRef.nativeElement, child)
    );
  }

  parse(): void {
    // process bold
    this.processBold();

    // process italic
    setTimeout(_ => {
      this.process(this.italicRegex, ChunkFlags.Italic);
    }, 100)

    // process bold italic
    setTimeout(_ => {
      this.process(this.boldItalicRegex, ChunkFlags.BoldItalic);
    }, 80)

    // process url
    setTimeout(_ => {
      this.process(this.urlRegex, ChunkFlags.UrlCaption);
      const index = this.chunks.findIndex(chunk => chunk.flag == ChunkFlags.UrlCaption);
      this.chunks[index+1].flag = ChunkFlags.UrlLink;
    }, 60)

    // process url
    setTimeout(_ => {
      this.process(this.tooltipRegex, ChunkFlags.TooltipCaption);
      const index = this.chunks.findIndex(chunk => chunk.flag == ChunkFlags.TooltipCaption);
      this.chunks[index+1].flag = ChunkFlags.TooltipInfo;
    }, 40)
  }


  processBold(): void {
    let match = null;
    let matches: string[] = [];
    let chunks = this.paragraph.split(this.boldRegex);
    while ((match = this.boldRegex.exec(this.paragraph)) != null) {
      matches.push(match[1]);
    }
    chunks.forEach(chunk => {
      this.chunks.push({value: chunk, flag: matches.includes(chunk) ? ChunkFlags.Bold : ChunkFlags.Normal});
    })
  }

  process(regex: RegExp, flag: ChunkFlags): void {
    let match = null;
    let matches: string[] = [];
    let index = 0;
    this.chunks.forEach(chunk => {
      if (chunk.flag === ChunkFlags.Normal) {
        let chunks = chunk.value.split(regex);
        if (chunks.length > 1) {
          while ((match = regex.exec(chunk.value)) != null) {
            console.log("match found at " + match[1]);
            matches.push(match[1]);
          }
          let deleteIt = true;
          chunks.forEach(chunk => {
            this.chunks.splice(++index, deleteIt ? 1 : 0, {
              value: chunk,
              flag: matches.includes(chunk) ? flag : ChunkFlags.Normal
            });
            deleteIt = false;
          })
        }
      } else {
        index++
      }
      // console.log(this.chunks);
    })
  }

  render(): void {
    this.chunks.forEach((chunk, index) => {
      console.log(chunk.flag, chunk.value);
      switch (chunk.flag) {
        case ChunkFlags.Normal: this.addSpan(chunk.value); break;
        case ChunkFlags.Bold: this.addSpan(chunk.value, PARSER_CSS.BOLD); break;
        case ChunkFlags.Italic: this.addSpan(chunk.value, PARSER_CSS.ITALIC); break;
        case ChunkFlags.BoldItalic: this.addSpan(chunk.value, PARSER_CSS.BOLD_ITALIC); break;
        case ChunkFlags.UrlCaption: this.addUrl(chunk.value, this.chunks[index+1].value); break;
        case ChunkFlags.TooltipCaption: this.addTooltip(chunk.value, this.chunks[index+1].value); break;
      }
    })
  }

  addSpan(chunk: string, cssClass: string = 'normal'): void {
    const span = this.renderer.createElement('span');
    this.renderer.addClass(span, cssClass);
    const text = this.renderer.createText(chunk);
    this.renderer.appendChild(span, text);
    this.renderer.appendChild(this.elementRef.nativeElement, span);
  }

  addUrl(caption: string, link: string): void {}
  addTooltip(caption: string, description: string): void {}
}

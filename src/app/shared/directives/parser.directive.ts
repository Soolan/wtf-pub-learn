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

    // setTimeout(_ => {
    //
    // },120)
    const span = this.renderer.createElement('span');
    const text = this.renderer.createText(this.paragraph);
    this.renderer.appendChild(span, text);
    this.renderer.appendChild(this.elementRef.nativeElement, span);
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
      console.log(this.chunks);
    })
  }

  addText(chunk: string): void {
    const span = this.renderer.createElement('span');
    const text = this.renderer.createText(chunk);
    this.renderer.appendChild(span, text);
    this.renderer.appendChild(this.elementRef.nativeElement, span);
  }

  addBlack(chunk: string): void {
    const span = this.renderer.createElement('span');
    this.renderer.addClass(span, 'black');
    const text = this.renderer.createText(chunk);
    this.renderer.appendChild(span, text);
    this.renderer.appendChild(this.elementRef.nativeElement, span);
  }
}

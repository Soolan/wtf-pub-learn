import {Directive, ElementRef, Input, Renderer2} from '@angular/core';
import {Chunk, ChunkFlags, PARSER_CSS, REGEX} from '../models/parser';

@Directive({
  selector: '[appParser]'
})

export class ParserDirective {
  @Input() paragraph!: string;
  chunks: Chunk[] = [];
  index = 0;

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
      this.process(REGEX.ITALIC, ChunkFlags.Italic);
    }, 100)

    // process bold italic
    setTimeout(_ => {
      this.process(REGEX.BOLD_ITALIC, ChunkFlags.BoldItalic);
    }, 80)

    // process url
    setTimeout(_ => {
      this.process(REGEX.URL, ChunkFlags.UrlCaption);
      const index = this.chunks.findIndex(chunk => chunk.flag == ChunkFlags.UrlCaption);
      this.chunks[index + 1].flag = ChunkFlags.UrlLink;
    }, 60)

    // process url
    setTimeout(_ => {
      this.process(REGEX.TOOLTIP, ChunkFlags.TooltipCaption);
      const index = this.chunks.findIndex(chunk => chunk.flag == ChunkFlags.TooltipCaption);
      this.chunks[index + 1].flag = ChunkFlags.TooltipInfo;
    }, 40)
  }


  processBold(): void {
    let match = null;
    let matches: string[] = [];
    let chunks = this.paragraph.split(REGEX.BOLD);
    match = REGEX.BOLD.exec(this.paragraph);
    while (match != null) {
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
    })
  }

  render(): void {
    this.chunks.forEach((chunk, index) => {
      switch (chunk.flag) {
        case ChunkFlags.Normal:
          this.addSpan(chunk.value);
          break;
        case ChunkFlags.Bold:
          this.addSpan(chunk.value, PARSER_CSS.BOLD);
          break;
        case ChunkFlags.Italic:
          this.addSpan(chunk.value, PARSER_CSS.ITALIC);
          break;
        case ChunkFlags.BoldItalic:
          this.addSpan(chunk.value, PARSER_CSS.BOLD_ITALIC);
          break;
        case ChunkFlags.UrlCaption:
          this.addUrl(chunk.value, this.chunks[index + 1].value, PARSER_CSS.URL_CAPTION);
          break;
        case ChunkFlags.TooltipCaption:
          this.addTooltip(chunk.value, PARSER_CSS.TOOLTIP_CAPTION, this.chunks[index + 1].value, PARSER_CSS.TOOLTIP_INFO);
          break;
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

  addUrl(caption: string, link: string, cssClass: string): void {
    const a = this.renderer.createElement('a');
    this.renderer.addClass(a, cssClass);
    const text = this.renderer.createText(caption);
    this.renderer.setProperty(a, 'href', link);
    this.renderer.setProperty(a, 'target', 'blank');
    this.renderer.appendChild(a, text);

    const icon = this.addIcon('open_in_new');
    this.renderer.appendChild(a, icon);

    this.renderer.appendChild(this.elementRef.nativeElement, a);
  }

  private addIcon(matIcon: string) {
    const icon = this.renderer.createElement('span');
    this.renderer.addClass(icon, "material-icons");
    this.renderer.setStyle(icon, 'font-size', 'inherit')
    const iconText = this.renderer.createText(matIcon);
    this.renderer.appendChild(icon, iconText);
    return icon;
  }

  addTooltip(caption: string, cssCaption: string, description: string, cssDescription: string): void {
    const captionSpan = this.renderer.createElement('span');
    this.renderer.addClass(captionSpan, cssCaption);

    const text = this.renderer.createText(caption);
    this.renderer.appendChild(captionSpan, text);

    const descriptionSpan = this.renderer.createElement('span');
    this.renderer.addClass(descriptionSpan, cssDescription);
    const descriptionText = this.renderer.createText(description);
    this.renderer.appendChild(descriptionSpan, descriptionText);

    this.renderer.appendChild(captionSpan, descriptionSpan);
    this.renderer.appendChild(this.elementRef.nativeElement, captionSpan);

    const icon = this.addIcon('info');
    this.renderer.setStyle(icon, 'color', 'var(--color-accent)')
    this.renderer.appendChild(this.elementRef.nativeElement, icon);
  }
}

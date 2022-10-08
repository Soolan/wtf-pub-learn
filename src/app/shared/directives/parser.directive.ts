import {Directive, ElementRef, Input, Renderer2} from '@angular/core';
import {Chunk, ChunkFlag, PARSER_CSS, REGEX} from '../models/parser';

@Directive({
  selector: '[appParser]'
})

export class ParserDirective {
  @Input() paragraph!: string;
  index = 0;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.cleanUp();
    this.parse().then(chunks => this.render(chunks));
  }

  cleanUp(): void {
    Array.from(this.elementRef.nativeElement.children)
      .forEach(child => this.renderer.removeChild(this.elementRef.nativeElement, child));
  }

  parse(): Promise<Chunk[]> {
    let chunks: Chunk[] = [];

    return new Promise((resolve, reject) => {
      console.log(
        REGEX.BOLD.test(this.paragraph),
        REGEX.ITALIC.test(this.paragraph),
        REGEX.BOLD_ITALIC.test(this.paragraph),
        REGEX.URL.test(this.paragraph),
        REGEX.TOOLTIP.test(this.paragraph),
      );

      // process bold
      if (REGEX.BOLD.test(this.paragraph)) {
        console.log("bold",);
        this.processBold()
          .then(chunks => {
            // process italic
            // if (REGEX.ITALIC.test(this.paragraph)) {
            this.process(REGEX.ITALIC, ChunkFlag.Italic, chunks)
              .then(chunks => {
                // process bold italic
                this.process(REGEX.BOLD_ITALIC, ChunkFlag.BoldItalic, chunks)
                  .then(chunks => {
                    // process url
                    this.process(REGEX.URL, ChunkFlag.UrlCaption, chunks)
                      .then(chunks => {
                        const index = chunks.findIndex(chunk => chunk.flag == ChunkFlag.UrlCaption);
                        chunks[index + 1].flag = ChunkFlag.UrlLink;

                        // process tooltip
                        if (REGEX.TOOLTIP.test(this.paragraph)) {
                          this.process(REGEX.TOOLTIP, ChunkFlag.TooltipCaption, chunks);
                          const index = chunks.findIndex(chunk => chunk.flag == ChunkFlag.TooltipCaption);
                          chunks[index + 1].flag = ChunkFlag.TooltipInfo;
                        }
                      })
                  })
              })
          })
      }
      resolve(chunks);
    })
  }

  processBold(): Promise<any> {
    let result: Chunk[];
    let match = null;
    let matches: string[] = [];
    let splits = this.paragraph.split(REGEX.BOLD);
    return new Promise((resolve, reject) => {
      while ((match = REGEX.BOLD.exec(this.paragraph)) != null) {
        matches.push(match[1]);
      }
      splits.forEach(chunk => {
        result.push({value: chunk, flag: matches.includes(chunk) ? ChunkFlag.Bold : ChunkFlag.Normal});
      });
      resolve(result);
    })
  }

  process(regex: RegExp, flag: ChunkFlag, chunks: Chunk[]): Promise<Chunk[]> {
    let match = null;
    let matches: string[] = [];
    let index = 0;
    // if (this.chunks.length === 0) this.chunks.push({value:this.paragraph, flag:ChunkFlags.Normal});
    return new Promise((resolve, reject) => {
      chunks.forEach(chunk => {
        if (chunk.flag === ChunkFlag.Normal) {
          let fragments = chunk.value.split(regex);
          if (fragments.length > 1) {
            while ((match = regex.exec(chunk.value)) != null) {
              matches.push(match[1]);
            }
            let deleteIt = true;
            fragments.forEach(fragment => {
              chunks.splice(++index, deleteIt ? 1 : 0, {
                value: fragment,
                flag: matches.includes(fragment) ? flag : ChunkFlag.Normal
              });
              deleteIt = false;
            })
          }
        } else {
          index++;
        }
      })
      resolve(chunks);
    })
  }

  render(chunks: Chunk[]): void {
    if (chunks.length === 0) {
      this.addSpan(this.paragraph);
      return;
    }
    chunks.forEach((chunk, index) => {
      switch (chunk.flag) {
        case ChunkFlag.Normal:
          this.addSpan(chunk.value);
          break;
        case ChunkFlag.Bold:
          this.addSpan(chunk.value, PARSER_CSS.BOLD);
          break;
        case ChunkFlag.Italic:
          this.addSpan(chunk.value, PARSER_CSS.ITALIC);
          break;
        case ChunkFlag.BoldItalic:
          this.addSpan(chunk.value, PARSER_CSS.BOLD_ITALIC);
          break;
        case ChunkFlag.UrlCaption:
          this.addUrl(chunk.value, chunks[index + 1].value, PARSER_CSS.URL_CAPTION);
          break;
        case ChunkFlag.TooltipCaption:
          this.addTooltip(chunk.value, PARSER_CSS.TOOLTIP_CAPTION, chunks[index + 1].value, PARSER_CSS.TOOLTIP_INFO);
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

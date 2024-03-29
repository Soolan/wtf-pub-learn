import {Directive, ElementRef, Input, Renderer2} from '@angular/core';
import {Chunk, ChunkFlag, PARSER_CSS, REGEX} from '../models/parser';

@Directive({
  selector: '[appParser]'
})

export class ParserDirective {
  @Input() paragraph!: string;
  index = 0;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
  }

  ngOnInit(): void {

  }



  parse(): Promise<Chunk[]> {
    return new Promise(async (resolve, reject) => {
      // process bold
      if (REGEX.BOLD.test(this.paragraph)) {
        console.log("bold",);
        // .then(async chunks => {
        //   // process italic
        //   // if (REGEX.ITALIC.test(this.paragraph)) {
        //   // await this.process(REGEX.ITALIC, ChunkFlag.Italic, chunks)
        //   //   .then(chunks => {
        //   //     console.log(chunks);
        //
        //       // process bold italic
        //       // this.process(REGEX.BOLD_ITALIC, ChunkFlag.BoldItalic, chunks)
        //       //   .then(chunks => {
        //       //     // process url
        //       //     this.process(REGEX.URL, ChunkFlag.UrlCaption, chunks)
        //       //       .then(chunks => {
        //       //         const index = chunks.findIndex(chunk => chunk.flag == ChunkFlag.UrlCaption);
        //       //         chunks[index + 1].flag = ChunkFlag.UrlLink;
        //       //
        //       //         // process tooltip
        //       //         if (REGEX.TOOLTIP.test(this.paragraph)) {
        //       //           this.process(REGEX.TOOLTIP, ChunkFlag.TooltipCaption, chunks);
        //       //           const index = chunks.findIndex(chunk => chunk.flag == ChunkFlag.TooltipCaption);
        //       //           chunks[index + 1].flag = ChunkFlag.TooltipInfo;
        //       //         }
        //       //       })
        //       //   })
        //     // })
        // })
      }
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


  addSpan(chunk: string, cssClass: string = 'normal'): void {
    const span = this.renderer.createElement('span');
    this.renderer.addClass(span, cssClass);
    const text = this.renderer.createText(chunk);
    this.renderer.appendChild(span, text);
    this.renderer.appendChild(this.elementRef.nativeElement, span);
    console.log("DONE!")
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

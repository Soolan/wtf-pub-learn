import {Directive, ElementRef, Input, Renderer2, SimpleChanges} from '@angular/core';

@Directive({
  selector: '[appBlackRenderer]'
})
export class BlackRendererDirective {
  @Input() content!: string;
  @Input() keyword!: string;
  index: number = 0;
  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
  ) { }

  ngOnInit(): void {
    this.cleanUp();
    let chunks = this.content.split(this.keyword); // turn the contents into an array
    chunks.splice(1, 0, this.keyword); // inserts the keyword at index 1

    chunks.forEach(chunk => {
      (chunk === this.keyword) ? this.addBlack(chunk) : this.addText(chunk);
    })
  }

  cleanUp(): void {
    Array.from(this.elementRef.nativeElement.children).forEach(
      child => this.renderer.removeChild(this.elementRef.nativeElement, child)
    );
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

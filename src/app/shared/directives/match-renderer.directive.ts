import {Directive, ElementRef, Input, Renderer2, SimpleChanges} from '@angular/core';

@Directive({
  selector: '[appMatchRenderer]'
})
export class MatchRendererDirective {
  @Input() column!: string;
  @Input() contents!: string[];
  index: number = 0;

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    this.index = 0;
    Array.from(this.elementRef.nativeElement.children).forEach(child => {
      this.renderer.removeChild(this.elementRef.nativeElement, child);
    })
    this.contents.forEach(item => {
      this.render(this.column, item);
    })
  }

  render(column: string, content: string) {
    const div = this.renderer.createElement('div');
    const text = this.renderer.createText(content);
    const id = column + this.index++;
    this.renderer.addClass(div, column);
    this.renderer.setProperty(div, 'id', id);
    this.renderer.appendChild(div, text);
    this.renderer.appendChild(this.elementRef.nativeElement, div);
  }
}

import {Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges} from '@angular/core';
import {BLANK_PLACEHOLDER} from '../data/generic';

@Directive({
  selector: '[appBlankRenderer]'
})
export class BlankRendererDirective implements OnChanges {
  @Input() scenario!: string;
  index: number = 0;
  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
  ) {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.index = 0;
    Array.from(this.elementRef.nativeElement.children).forEach(child => {
      this.renderer.removeChild(this.elementRef.nativeElement, child);
    })
    let chunks = this.scenario.split(BLANK_PLACEHOLDER);

    if (this.scenario.indexOf(BLANK_PLACEHOLDER) == 0) {
      this.addBlank();
    }

    chunks.forEach(chunk => {
      this.addText(chunk);
      if (chunks.length > this.index+1) {
        this.addBlank();
      }
    })
  }

  addText(chunk: string) {
    const span = this.renderer.createElement('span');
    const text = this.renderer.createText(chunk);
    this.renderer.appendChild(span, text);
    this.renderer.appendChild(this.elementRef.nativeElement, span);
  }

  addBlank() {
    const span = this.renderer.createElement('span');
    this.renderer.addClass(span, 'blank');
    this.renderer.setProperty(span, 'id', 'blank' + this.index++);
    this.renderer.appendChild(this.elementRef.nativeElement, span);
  }
}

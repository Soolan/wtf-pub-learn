import {Directive, ElementRef, Input, Renderer2} from '@angular/core';
import {BLANK_PLACEHOLDER, POSITIONS} from '../data/generic';

@Directive({
  selector: '[appTypeInRenderer]'
})
export class TypeInRendererDirective {
  @Input() scenario!: string;
  @Input() position!: number;
  index: number = 0;

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
  ) {
  }

  ngOnInit() {
    this.index = 0;
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
    this.renderer.addClass(span, 'type-in');
    this.renderer.setProperty(span, 'id', POSITIONS[this.position]);
    this.renderer.appendChild(this.elementRef.nativeElement, span);
    this.index++;
  }
}

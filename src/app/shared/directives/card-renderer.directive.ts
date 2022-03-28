import {Directive, ElementRef, Input, Renderer2} from '@angular/core';
import {Card} from '../models/slide';

@Directive({
  selector: '[appCardRenderer]'
})
export class CardRendererDirective {
  @Input() cards!: Card[];
  index: number = 0;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) { }

  ngOnChanges(): void {
    this.index = 0;
    Array.from(this.elementRef.nativeElement.children)
      .forEach(child => this.renderer.removeChild(this.elementRef.nativeElement, child));
    this.cards.forEach(card => this.addCard(card.question));
  }

  addCard(content: string): void {
    const div = this.renderer.createElement('div');
    const text = this.renderer.createText(content);
    this.renderer.addClass(div, 'card');
    this.renderer.setProperty(div, 'id', 'card' + this.index++);
    this.renderer.setProperty(div, 'z-index', this.index);
    const p = this.renderer.createElement('p');
    this.renderer.appendChild(p, text);
    this.renderer.appendChild(div, p);
    this.renderer.appendChild(this.elementRef.nativeElement, div);
  }
}

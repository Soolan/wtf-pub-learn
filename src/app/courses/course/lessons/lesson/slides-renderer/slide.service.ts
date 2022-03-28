import {ElementRef, Injectable, Renderer2, RendererFactory2} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Slide, SlideHeaderFooter, Style, TransX} from '../../../../../shared/models/slide';
import {ACTIONS, OPTIONS_BREAKPOINT} from '../../../../../shared/data/generic';
import {SlideType} from '../../../../../shared/data/enums';

@Injectable({
  providedIn: 'root'
})
export class SlideService {
  ui: BehaviorSubject<SlideHeaderFooter>;
  slides!: Slide[];
  markerIndex!: number;
  actionMessage!: string;
  renderer: Renderer2;
  negate: number = -1;

  constructor(private rendererFactory: RendererFactory2) {
    // Get an instance of Renderer2 and initialize the renderer
    // Currently this is the only way to init Renderer2 in a service
    this.renderer = rendererFactory.createRenderer(null, null);
    this.ui = new BehaviorSubject<SlideHeaderFooter>({
      marker: 0,
      action: ACTIONS[SlideType.Start],
      response: '',
      correct: false,
      completed: false
    });
    this.markerIndex = 0;
  }

  next(snapshot: SlideHeaderFooter): void {
    this.ui.next(snapshot);
    // keep them ready, so you don't have to listen to observables in the header and the footer
    this.markerIndex = snapshot.marker;
    this.actionMessage = snapshot.action;
  }

  // We need only one option to have a length over 25 characters in order to
  // change the options layout from double column to single column
  isSingleColumn(options: string[]): boolean {
    let isSingle = false;
    options.map(option => isSingle = (option.length > OPTIONS_BREAKPOINT) || isSingle);
    return isSingle;
  }

  initOptionSet(isActive: boolean, optionObjects: any[], answer: string, optionsPerSet: number): any {
    let optionsArray = this.initOptions(optionObjects, answer);                // create
    let options = this.randomizeOptions(optionsPerSet, optionsArray, answer);  // randomize
    let isSingle = this.isSingleColumn(optionsArray);                          // decide orientation
    return {isActive, options, isSingle};
  }

  private initOptions(options: any[], answer: string): string[] {
    let result: string[] = [];
    options.map(option => {     // Create a pull of options without correct answers
      if (answer !== option.value) result.push(option.value);
    });
    return result;
  }

  randomizeOptions(optionsPerSet: number, options: string[], answer: string) {
    let result: string[] = [];
    let index: number = 0;

    result.push(answer);     // each set should contain the right answer
    while (result.length < optionsPerSet) {
      // pick a random option from options pool and push it to the set
      index = Math.floor(Math.random() * options.length);
      result.push(options[index]);
      // remove the used option from pool (we don't want duplicates)
      options = options.filter(item => item != options[index]);
    }

    // shuffle the options in the current set
    result.sort(() => Math.random() - 0.5);
    return result;
  }

  fillBlank(blank: any, answer: string): void {
    this.renderer.removeClass(blank, 'blank');
    this.renderer.removeClass(blank, 'type-in');
    this.renderer.addClass(blank, 'answer');
    this.renderer.appendChild(blank, this.renderer.createText(answer + ' '));
  }

  resetButtonStyles(element: any) {
    this.renderer.removeClass(element, 'disable');
    this.renderer.removeClass(element, 'mark');
  }

  markAsIncorrect(button: EventTarget) {
    this.renderer.addClass(button, 'shake');
    this.renderer.addClass(button, 'incorrect');
    this.renderer.addClass(button, 'disable');
    const span = this.setIcon('close');
    this.renderer.appendChild(button, span);
  }


  markAsCorrect(button: EventTarget) {
    this.renderer.addClass(button, 'correct');
    this.renderer.addClass(button, 'disable');
    const span = this.setIcon('check');
    this.renderer.appendChild(button, span);
  }

  private setIcon(icon: string) {
    const span = this.renderer.createElement('span');
    this.renderer.setStyle(span, 'vertical-align', 'middle');
    this.renderer.addClass(span, 'material-icons');
    const content = this.renderer.createText(icon);
    this.renderer.appendChild(span, content);
    return span;
  }

  randomizeMultiChoiceOptions(optionsPerSet: number, options: string[], answers: string[]) {
    let result: string[] = [];
    let index: number = 0;
    answers.forEach(answer => result.push(answer));     // each set should contain the right answer
    while (result.length < optionsPerSet) {
      // pick a random option from options pool and push it to the set
      index = Math.floor(Math.random() * options.length);
      result.push(options[index]);
      // remove the used option from pool (we don't want duplicates)
      options = options.filter(item => item != options[index]);
    }

    // shuffle the options in the current set
    result.sort(() => Math.random() - 0.5);
    return result;
  }

  transformCard(element: any) {
    this.renderer.setStyle(element, 'transform', 'translate(0) rotate(0)');
    let location = Math.floor(Math.random() * 9) * this.negate;
    let rotation = Math.floor(Math.random() * 9) * this.negate;
    this.negate = -this.negate;
    this.renderer.setStyle(element, 'transition', 'transform 0.15s ease-in');
    this.renderer.setStyle(element, 'transform', `translate(${location}%, ${location}%) rotate(${rotation}deg)`);
  }

  straightCard(element: any) {
    this.renderer.setStyle(element, 'transition', 'transform 0.2s ease-in');
    this.renderer.setStyle(element, 'transform', 'translate(0) rotate(0)');
  }

  swipeCard(element: any, direction: string) {
    const translate = direction === 'right' ? 110 : -110;
    const rotate = direction === 'right' ? 120 : -120;
    this.renderer.setStyle(element, 'transition', 'transform 0.3s ease-out, opacity 0.3s ease-out');
    this.renderer.setStyle(element, 'transform', `translateX(${translate}%) rotate(${rotate}deg)`);
    this.renderer.setStyle(element, 'opacity', '0');
    setTimeout(() => {
      element.remove();
    }, 280)
  }

  setStyles(element: any, styles: Style[]) {
    styles.forEach(s => this.renderer.setStyle(element, s.name, s.value));
  }

  shake(button: EventTarget) {
    this.renderer.addClass(button, 'shake');
  }

  removeChildren(node: ElementRef) {
    for (let child of node.nativeElement.children) {
      this.renderer.removeChild(node.nativeElement, child);
    }
  }

  // addChild(node: ElementRef, text: string) {
  //   const content = this.renderer.createText(text);
  //   const div = this.renderer.createElement('div');
  //   this.renderer.appendChild(div, content);
  //   this.renderer.appendChild(node, div);
  //
  //   const styles: Style[] = [
  //     {name: 'box-shadow', value: '0 0 7px 1px' + Dom.COLORS.soolanAnsewr},
  //     {name: 'background', value: Dom.COLORS.soolanMarked},
  //     {name: 'color', value: Dom.COLORS.soolanRight},
  //     {name: 'display', value: 'block'},
  //     {name: 'border', value: '1px solid ' + Dom.COLORS.soolanMarked},
  //     {name: 'font-size', value: 'smaller'},
  //     {name: 'margin', value: '0.75rem 0.5rem'},
  //     {name: 'padding', value: '0.5rem'},
  //     {name: 'opacity', value: '1'},
  //     {
  //       name: 'transition',
  //       value: 'background 1s 1s, color 1s 1s, box-shadow 1s 1s, opacity 1s 1s'
  //     },
  //   ]
  //   this.setStyles(div, styles);
  // }
}

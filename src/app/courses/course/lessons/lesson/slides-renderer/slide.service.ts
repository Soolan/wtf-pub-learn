import {ElementRef, Injectable, Renderer2, RendererFactory2} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Slide, SlideHeaderFooter, Style, TransX} from '../../../../../shared/models/slide';
import {ACTIONS, OPTIONS_BREAKPOINT} from '../../../../../shared/data/generic';
import {SlideType} from '../../../../../shared/data/enums';
import {CrudService} from '../../../../../shared/services/crud.service';
import {CurrentService} from '../../../../../shared/services/current.service';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {COURSES, LESSONS, PROFILES} from '../../../../../shared/data/collections';

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
  userId!: string | undefined;

  constructor(
    private crud: CrudService,
    private auth: AngularFireAuth,
    private currentService: CurrentService,
    private rendererFactory: RendererFactory2
  ) {
    this.auth.currentUser.then(user => this.userId = user?.uid).catch();
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

  reset(): void {
    this.ui.next({
      marker: 0,
      action: ACTIONS[SlideType.Start],
      response: '',
      correct: false,
      completed: false
    });
    this.markerIndex = 0;
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

  resetButtonStyles(element: any): void {
    this.renderer.removeClass(element, 'disable');
    this.renderer.removeClass(element, 'mark');
  }

  markAsCorrect(button: EventTarget): void {
    this.renderer.addClass(button, 'correct');
    this.renderer.addClass(button, 'disable');
    const span = this.setIcon('check');
    this.renderer.appendChild(button, span);
  }

  markAsIncorrect(button: EventTarget): void {
    this.renderer.addClass(button, 'shake');
    this.renderer.addClass(button, 'incorrect');
    this.renderer.addClass(button, 'disable');
    const span = this.setIcon('close');
    this.renderer.appendChild(button, span);
    if (this.userId && this.currentService.current.value.lesson.current_slide <= this.markerIndex) this.updateScore();
  }

  markAsDisabled(button: EventTarget): void {
    this.renderer.addClass(button, 'incorrect');
    this.renderer.addClass(button, 'disable');
  }

  markAsExamSelected(button: EventTarget): void {
    this.renderer.addClass(button, 'examSelected');
    console.log('selected')
  }

  markAsExamUnselected(button: EventTarget): void {
    this.renderer.removeClass(button, 'examSelected');
    console.log('unselected')
  }

  updateScore(): void {
    const current = {...this.currentService.current.value};
    current.lesson.info.score -= current.points;
    this.currentService.next(current);
    const path: string = `${PROFILES.path}/${this.userId}/${COURSES.path}/${current.courseId}/${LESSONS.path}`;
    const progressRef = this.crud.docRef(path, current.lessonId);

    progressRef.update(current.lesson).then().catch();
  }

  private setIcon(icon: string): any {
    const span = this.renderer.createElement('span');
    this.renderer.setStyle(span, 'vertical-align', 'middle');
    this.renderer.addClass(span, 'material-icons');
    const content = this.renderer.createText(icon);
    this.renderer.appendChild(span, content);
    return span;
  }

  randomizeMultiChoiceOptions(optionsPerSet: number, options: string[], answers: string[]): string[] {
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

  transformCard(element: any): void {
    this.renderer.setStyle(element, 'transform', 'translate(0) rotate(0)');
    let location = Math.floor(Math.random() * 9) * this.negate;
    let rotation = Math.floor(Math.random() * 9) * this.negate;
    this.negate = -this.negate;
    this.renderer.setStyle(element, 'transition', 'transform 0.15s ease-in');
    this.renderer.setStyle(element, 'transform', `translate(${location}%, ${location}%) rotate(${rotation}deg)`);
  }

  straightCard(element: any): void {
    this.renderer.setStyle(element, 'transition', 'transform 0.2s ease-in');
    this.renderer.setStyle(element, 'transform', 'translate(0) rotate(0)');
  }

  swipeCard(element: any, direction: string): void {
    const translate = direction === 'right' ? 110 : -110;
    const rotate = direction === 'right' ? 120 : -120;
    this.renderer.setStyle(element, 'transition', 'transform 0.3s ease-out, opacity 0.3s ease-out');
    this.renderer.setStyle(element, 'transform', `translateX(${translate}%) rotate(${rotate}deg)`);
    this.renderer.setStyle(element, 'opacity', '0');
    setTimeout(() => {
      element.remove();
    }, 280)
  }

  dontSwipeCard(element: any, direction: string): void {
    const translate = direction === 'right' ? 2 : -2;
    const rotate = direction === 'right' ? 4 : -4;
    this.renderer.setStyle(element, 'transition', 'transform 0.2s ease-out');
    this.renderer.setStyle(element, 'transform', `translateX(${translate}%) rotate(${rotate}deg)`);
    if (this.userId && this.currentService.current.value.lesson.current_slide <= this.markerIndex) this.updateScore();
    setTimeout(() => {
      this.renderer.setStyle(element, 'transform', `translateX(${translate - translate}%) rotate(${rotate - rotate}deg)`);
    }, 800)
  }

  setStyles(element: any, styles: Style[]): void {
    styles.forEach(s => this.renderer.setStyle(element, s.name, s.value));
  }

  shake(element: EventTarget): void {
    if (this.userId && this.currentService.current.value.lesson.current_slide <= this.markerIndex) this.updateScore();
    this.renderer.addClass(element, 'shake');
  }

  removeChildren(node: ElementRef): void {
    for (let child of node.nativeElement.children) {
      this.renderer.removeChild(node.nativeElement, child);
    }
  }

  addChild(node: ElementRef, text: string) {
    const content = this.renderer.createText(text);
    const div = this.renderer.createElement('div');
    this.renderer.appendChild(div, content);
    this.renderer.appendChild(node, div);

    const styles: Style[] = [
      {name: 'box-shadow', value: '0 0 7px 1px var(--color-primary-dark)'},
      {name: 'background', value: 'var(--color-primary-light)'},
      {name: 'color', value: 'var(--color-primary)'},
      {name: 'display', value: 'block'},
      {name: 'border', value: '1px solid var(--color-primary-dark)'},
      {name: 'font-size', value: 'smaller'},
      {name: 'margin', value: '0.75rem 0.5rem'},
      {name: 'padding', value: '0.5rem'},
      {name: 'opacity', value: '1'},
      {name: 'transition', value: 'background 1s 1s, color 1s 1s, box-shadow 1s 1s, opacity 1s 1s'},
    ]
    this.setStyles(div, styles);
  }


  matchColumns(question: any, answer: any, index: number) {
    const width = window.innerWidth;
    let transX: TransX;
    transX = SlideService.getTransX(width);

    const styles: Style[] = [
      {name: 'box-shadow', value: '0 0 0px 0px var(--color-greye)'},
      {name: 'position', value: 'absolute'},
      {
        name: 'transition',
        value: 'background 0.15s , color 0.15s, box-shadow 0.55s 0.2s, transform 0.3s 0.1s, top 0.4s 0.1s'
      },
    ];

    const questionStyles: Style[] = styles.concat([
      {name: 'background', value: 'var(--color-primary-dark)'},
      {name: 'color', value: 'var(--color-primary-light)'},
      {name: 'z-index', value: '20'},
      {name: 'transform', value: `translate(${transX.right}, 0)`},
    ]);
    this.renderer.addClass(question, 'q');

    const answerStyles: Style[] = styles.concat([
      {name: 'background', value: 'var(--color-primary)'},
      {name: 'color', value: 'var(--color-primary-lighter)'},
      {name: 'z-index', value: '15'},
      {name: 'cursor', value: 'default'},
      {name: 'transform', value: `translate(${transX.left}, 0)`},
    ]);

    this.setStyles(question, questionStyles);
    this.setStyles(answer, answerStyles);

    setTimeout(() => {
      const transY = (index * 105) + 475 + '%';
      this.renderer.setStyle(question, 'transform', `translate(${transX.right}, ${transY})`)
      this.renderer.setStyle(answer, 'transform', `translate(${transX.left}, ${transY})`)
    }, index == 4 ? 0 : 400)
  }

  private static getTransX(width: number): TransX {
    let transX: TransX = {left: '', right: ''};
    if (width < 400) {
      transX.left = "-10%";
      transX.right = "10%"
    } else if (401 < width && width < 500) {
      transX.left = "-8%";
      transX.right = "8%";
    } else if (501 < width && width < 600) {
      transX.left = "-7%";
      transX.right = "7%";
    } else if (601 < width && width < 700) {
      transX.left = "-6%";
      transX.right = "6%";
    } else {
      transX.left = "-5.5%";
      transX.right = "5.5%";
    }
    return transX;
  }
}

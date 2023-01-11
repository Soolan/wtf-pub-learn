import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {SlideType} from '../../../../../shared/data/enums';
import {Slide} from '../../../../../shared/models/slide';
import {SlideService} from './slide.service';
import {CurrentService} from '../../../../../shared/services/current.service';

@Component({
  selector: 'app-slides-renderer',
  templateUrl: './slides-renderer.component.html',
  styleUrls: ['./slides-renderer.component.scss']
})
export class SlidesRendererComponent implements OnChanges {
  @Input() slides!: any[];
  @Input() passingGrade?: number;

  @ViewChild('outlet', {read: ViewContainerRef}) outletRef!: ViewContainerRef;
  @ViewChild('content', {read: TemplateRef}) contentRef!: TemplateRef<any>;

  index!: number;
  current!: Slide;
  type = 0;
  types = SlideType;

  constructor(private slideService: SlideService) { }

  ngOnChanges(changes: SimpleChanges) {
    this.slideService.ui.subscribe({
      next: data => this.setCurrentSlide(data.marker),
      error: error => console.log(error)
    })
  }

  public reload() {
    this.outletRef.clear();
    this.outletRef.createEmbeddedView(this.contentRef);
  }

  setCurrentSlide(index: number): void {
    // console.log(index,this.currentService.current.value.lesson?.current_slide);
    // if (index > 0 && this.slides[index].type === this.slides[index - 1].type) {
    // }
    this.current = this.slides[index];

    if (this.slideService.ui.value.reload) {
      this.reload();
    }
  }
}

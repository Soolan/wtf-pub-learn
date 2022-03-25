import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {SlideService} from '../slide.service';
import {ActivatedRoute} from '@angular/router';
import {NavigateService} from '../../../../../../shared/services/navigate.service';
import {ToggleHeaderFooterService} from '../../../../../../shared/services/toggle-header-footer.service';
import {Observable} from 'rxjs';
import {SlideHeaderFooter} from '../../../../../../shared/models/slide';
import {ACTIONS} from '../../../../../../shared/data/generic';

@Component({
  selector: 'app-renderer-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnChanges {
  @Input() count!: number;
  @Input() course!: string;
  @Input() lesson!: string;
  firstRow!: any;
  secondRow = Array(0);
  currentSlide!: number;
  courseId!: string;
  hover = false;
  constructor(
    private headerFooter: ToggleHeaderFooterService,
    public slideService: SlideService,
    private navigate: NavigateService,
    private route: ActivatedRoute
  ) {
    this.courseId = this.route.snapshot.paramMap.get('courseId') || '';
  }

  ngOnInit(): void {
    this.slideService.ui.subscribe({next: data => this.currentSlide = data.marker + 1});
    console.log(this.count, this.course, this.lesson);
    this.initMarkers();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  initMarkers(): void {
    if (this.count > 2) {
      if (this.count % 2 === 0) {
        this.firstRow = Array(this.count/2);
        this.secondRow = this.firstRow;
        console.log(this.count, this.firstRow, this.secondRow);
      } else {
        this.firstRow = Array(Math.ceil(this.count/2));
        this.secondRow = Array(this.firstRow.length - 1);
        console.log(this.count, this.firstRow, this.secondRow);
      }
    } else {
      console.log('slide count is not correct!', this.count);
    }
  }

  jumpTo(index: number): void {
    // You can only jump to previously visited slides. Jump ahead is not allowed.
    if (index < this.currentSlide) {
      this.slideService.next({
        marker: index,
        action: ACTIONS[this.slideService.slides[index].type],
        response: ''
      })
    }
  }

  exit(): void {
    this.navigate.goto('courses', this.courseId);
    this.headerFooter.toggle(true, true);
    this.headerFooter.toggle(true, false);
  }
}

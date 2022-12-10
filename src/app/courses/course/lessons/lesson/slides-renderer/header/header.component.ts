import {Component, Input, OnInit} from '@angular/core';
import {SlideService} from '../slide.service';
import {ActivatedRoute} from '@angular/router';
import {NavigateService} from '../../../../../../shared/services/navigate.service';
import {ToggleHeaderFooterService} from '../../../../../../shared/services/toggle-header-footer.service';
import {ACTIONS} from '../../../../../../shared/data/generic';
import {Current, CurrentService} from '../../../../../../shared/services/current.service';

@Component({
  selector: 'app-renderer-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() count!: number;
  @Input() course!: string;
  @Input() lesson!: string;
  firstRow!: any;
  secondRow = Array(0);
  courseId!: string;
  hover = false;
  progress!: number;
  constructor(
    private headerFooter: ToggleHeaderFooterService,
    private currentService: CurrentService,
    public slideService: SlideService,
    private navigate: NavigateService,
    private route: ActivatedRoute
  ) {
    this.courseId = this.route.snapshot.paramMap.get('courseId') || '';
  }

  ngOnInit(): void {
    this.initMarkers();
    this.currentService.current.subscribe({
      next: value => this.progress = value.lesson.current_slide
    });
  }

  initMarkers(): void {
    if (this.count > 2) {
      if (this.count % 2 === 0) {
        this.firstRow = Array(this.count/2);
        this.secondRow = this.firstRow;
      } else {
        this.firstRow = Array(Math.ceil(this.count/2));
        this.secondRow = Array(this.firstRow.length - 1);
      }
    } else {
      // ToDo: replace with proper ux
      console.log('slide count is not correct!', this.count);
    }
  }

  jumpTo(index: number): void {
    if (index <= this.progress) {
      this.slideService.next({
        marker: index,
        action: ACTIONS[this.slideService.slides[index].type],
        response: '',
        correct: false,
        completed: false
      })
    }
  }

  exit(): void {
    this.currentService.reset();
    this.slideService.reset();
    this.navigate.goto('courses', this.courseId);
    this.headerFooter.toggle(true, true);
    this.headerFooter.toggle(true, false);
  }

  get background(): string {
    return '';
  }

  get border(): string {
    return '';
  }
}

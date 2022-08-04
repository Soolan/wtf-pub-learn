import {Component, Input, OnInit} from '@angular/core';
import {ToggleHeaderFooterService} from '../../../../../../shared/services/toggle-header-footer.service';
import {SlideService} from '../slide.service';
import {NavigateService} from '../../../../../../shared/services/navigate.service';
import {ActivatedRoute} from '@angular/router';
import {HeaderComponent} from '../header/header.component';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit{
  @Input() slide: any;
  terms!: string[];
  courseId!: string;

  constructor(
    private headerFooter: ToggleHeaderFooterService,
    public slideService: SlideService,
    private navigate: NavigateService,
    private route: ActivatedRoute,
  ) {
    console.log(this.slide);
    this.courseId = this.route.snapshot.paramMap.get('courseId') || '';
  }

  ngOnInit() {
    this.terms = this.slide.content.terms.split(',');
  }

  bye(): void {
    this.navigate.goto('courses', this.courseId);
    this.headerFooter.toggle(true, true);
    this.headerFooter.toggle(true, false);
  }
}

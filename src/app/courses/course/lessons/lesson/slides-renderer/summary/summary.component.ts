import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {ToggleHeaderFooterService} from '../../../../../../shared/services/toggle-header-footer.service';
import {SlideService} from '../slide.service';
import {NavigateService} from '../../../../../../shared/services/navigate.service';
import {ActivatedRoute} from '@angular/router';
import {CurrentService} from '../../../../../../shared/services/current.service';
import {CrudService} from '../../../../../../shared/services/crud.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit, AfterViewInit{
  @Input() slide: any;
  terms!: string[];
  courseId!: string;
  isGuest = true;

  constructor(
    private headerFooter: ToggleHeaderFooterService,
    private currentService: CurrentService,
    private navigate: NavigateService,
    private route: ActivatedRoute,
  ) {
    this.courseId = this.route.snapshot.paramMap.get('courseId') || '';
  }

  ngOnInit() {
    this.terms = this.slide.content.terms.split(',');
  }

  ngAfterViewInit():void {
    const guest = document.getElementsByClassName('guest') as HTMLCollectionOf<HTMLElement>;
    const registered = document.getElementsByClassName('registered') as HTMLCollectionOf<HTMLElement>;
    this.isGuest ?
      registered[0].style.display = 'none':
      guest[0].style.display = 'none';
  }

  bye(): void {
    this.navigate.goto('courses', this.courseId);
    this.headerFooter.toggle(true, true);
    this.headerFooter.toggle(true, false);
  }
}

import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {SlideService} from '../slide.service';
import {BOUNCE} from '../../../../../../shared/animations/bounce';
import {STRETCH} from '../../../../../../shared/animations/strech';



@Component({
  selector: 'app-renderer-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  animations: [BOUNCE, STRETCH]
})
export class FooterComponent implements OnInit {
  @ViewChild('next') next!: ElementRef;

  response!: string;
  width = 0;
  completed = false;
  constructor(private slideService: SlideService) { }

  ngOnInit(): void {
    this.slideService.ui.subscribe({
      next: data => this.response = data.response,
      error: error => console.log(error)
    });
    this.width = this.next.nativeElement.offsetWidth;
    console.log(this.width, this.next.nativeElement.width, this.next.nativeElement.offsetWidth)
  }
}

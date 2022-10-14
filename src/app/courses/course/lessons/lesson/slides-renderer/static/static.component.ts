import {AfterViewInit, Component, Input} from '@angular/core';

@Component({
  selector: 'app-static',
  templateUrl: './static.component.html',
  styleUrls: ['./static.component.scss']
})
export class StaticComponent implements AfterViewInit{
  @Input() slide: any;
  isGuest = false;

  ngAfterViewInit():void {
    const guest = document.getElementsByClassName('guest') as HTMLCollectionOf<HTMLElement>;
    const registered = document.getElementsByClassName('registered') as HTMLCollectionOf<HTMLElement>;
    this.isGuest ?
      registered[0].style.display = 'none':
      guest[0].style.display = 'none';
  }
}

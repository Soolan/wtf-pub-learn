import {AfterViewInit, Component, Input} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';

@Component({
  selector: 'app-static',
  templateUrl: './static.component.html',
  styleUrls: ['./static.component.scss']
})
export class StaticComponent implements AfterViewInit{
  @Input() slide: any;

  constructor(private auth: AngularFireAuth) {}

  ngAfterViewInit():void {
    const guest = document.getElementsByClassName('guest') as HTMLCollectionOf<HTMLElement>;
    const registered = document.getElementsByClassName('registered') as HTMLCollectionOf<HTMLElement>;
    this.auth.authState.subscribe({
      next: user =>  {
        user?.uid ?
          guest[0].style.display = 'none' :
          registered[0].style.display = 'none';
      },
      error: err => console.log(err)
    })
  }
}

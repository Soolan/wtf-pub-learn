import {AfterViewInit, Component, Input} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';

@Component({
  selector: 'app-static',
  templateUrl: './static.component.html',
  styleUrls: ['./static.component.scss', '../slide.scss']
})
export class StaticComponent implements AfterViewInit {
  @Input() slide: any;

  constructor(private auth: AngularFireAuth) {
  }

  ngAfterViewInit(): void {
    const guest = document.getElementsByClassName('guest')[0] as HTMLElement;
    const registered = document.getElementsByClassName('registered')[0] as HTMLElement;
    this.auth.authState.subscribe({
      next: user => {
        if (user?.uid && guest) {
          guest.style.display = 'none'
        } else if (registered) {
          registered.style.display = 'none';
        }
      },
      error: err => console.log(err)
    })
  }
}

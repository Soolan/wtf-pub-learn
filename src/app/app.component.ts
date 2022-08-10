import {Component} from '@angular/core';
import {ToggleHeaderFooterService} from './shared/services/toggle-header-footer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'wtf-pub-learn';

  constructor(public toggle: ToggleHeaderFooterService) {
  }
}

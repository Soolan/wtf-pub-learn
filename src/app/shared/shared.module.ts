import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './components/header/header.component';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FooterComponent} from './components/footer/footer.component';
import {StorageUrlPipe} from './pipes/storage-url.pipe';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import { BlackRendererDirective } from './directives/black-renderer.directive';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    StorageUrlPipe,
    BlackRendererDirective,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    StorageUrlPipe,
    BlackRendererDirective,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatDividerModule,
    MatSidenavModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
  ]
})
export class SharedModule {
}

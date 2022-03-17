import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from './components/header/header.component';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {FlexLayoutModule} from '@angular/flex-layout';
import { FooterComponent } from './components/footer/footer.component';
import { StorageUrlPipe } from './pipes/storage-url.pipe';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    StorageUrlPipe,
  ],
    exports: [
        HeaderComponent,
        FooterComponent,
        StorageUrlPipe,
    ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatDividerModule,
    MatSidenavModule,
  ]
})
export class SharedModule { }

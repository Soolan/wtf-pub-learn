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
import {BlackRendererDirective} from './directives/black-renderer.directive';
import {BlankRendererDirective} from './directives/blank-renderer.directive';
import {TypeInRendererDirective} from './directives/type-in-renderer.directive';
import {CardRendererDirective} from './directives/card-renderer.directive';
import { MatchRendererDirective } from './directives/match-renderer.directive';
import {RouterModule} from '@angular/router';
import {MatTooltipModule} from '@angular/material/tooltip';
import { AuthenticationComponent } from './components/dialogs/authentication/authentication.component';
import { WalletComponent } from './components/dialogs/wallet/wallet.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    StorageUrlPipe,
    BlackRendererDirective,
    BlankRendererDirective,
    TypeInRendererDirective,
    CardRendererDirective,
    MatchRendererDirective,
    AuthenticationComponent,
    WalletComponent,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    StorageUrlPipe,
    BlackRendererDirective,
    BlankRendererDirective,
    TypeInRendererDirective,
    CardRendererDirective,
    MatchRendererDirective,
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
    RouterModule,
    MatTooltipModule,
  ]
})
export class SharedModule {
}

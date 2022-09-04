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
import {MatchRendererDirective} from './directives/match-renderer.directive';
import {RouterModule} from '@angular/router';
import {MatTooltipModule} from '@angular/material/tooltip';
import {AuthenticationComponent} from './components/dialogs/authentication/authentication.component';
import {WalletComponent} from './components/dialogs/wallet/wallet.component';
import {NotificationsComponent} from './components/dialogs/notifications/notifications.component';
import {MatDialogModule} from '@angular/material/dialog';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';
import { ImageUploaderComponent } from './components/image-uploader/image-uploader.component';
import { DropzoneDirective } from './directives/dropzone.directive';
import { UploadTaskComponent } from './components/image-uploader/upload-task/upload-task.component';

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
    NotificationsComponent,
    PageNotFoundComponent,
    AccessDeniedComponent,
    ImageUploaderComponent,
    DropzoneDirective,
    UploadTaskComponent,
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
        ImageUploaderComponent,
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
    MatDialogModule,
    RouterModule,
    MatTooltipModule,
  ]
})
export class SharedModule {
}

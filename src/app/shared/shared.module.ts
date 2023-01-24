import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './components/header/header.component';
import {MatIconModule} from '@angular/material/icon';
import {MatLegacyMenuModule as MatMenuModule} from '@angular/material/legacy-menu';
import {MatDividerModule} from '@angular/material/divider';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';
import {FooterComponent} from './components/footer/footer.component';
import {StorageUrlPipe} from './pipes/storage-url.pipe';
import {MatLegacyCardModule as MatCardModule} from '@angular/material/legacy-card';
import {MatLegacyListModule as MatListModule} from '@angular/material/legacy-list';
import {BlackRendererDirective} from './directives/black-renderer.directive';
import {BlankRendererDirective} from './directives/blank-renderer.directive';
import {TypeInRendererDirective} from './directives/type-in-renderer.directive';
import {CardRendererDirective} from './directives/card-renderer.directive';
import {MatchRendererDirective} from './directives/match-renderer.directive';
import {RouterModule} from '@angular/router';
import {MatLegacyTooltipModule as MatTooltipModule} from '@angular/material/legacy-tooltip';
import {AuthenticationComponent} from './components/dialogs/authentication/authentication.component';
import {WalletComponent} from './components/dialogs/wallet/wallet.component';
import {NotificationsComponent} from './components/dialogs/notifications/notifications.component';
import {MatLegacyDialogModule as MatDialogModule} from '@angular/material/legacy-dialog';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {AccessDeniedComponent} from './components/access-denied/access-denied.component';
import {ImageUploaderComponent} from './components/image-uploader/image-uploader.component';
import {DropzoneDirective} from './directives/dropzone.directive';
import {UploadTaskComponent} from './components/image-uploader/upload-task/upload-task.component';
import {ParserDirective} from './directives/parser.directive';
import {PrivacyPolicyComponent} from './components/privacy-policy/privacy-policy.component';
import {MarkdownModule} from 'ngx-markdown';
import {TermsAndConditionsComponent} from './components/terms-and-conditions/terms-and-conditions.component';
import {MatLegacyProgressSpinnerModule as MatProgressSpinnerModule} from '@angular/material/legacy-progress-spinner';
import {TopUpPleaseComponent} from './components/dialogs/top-up-please/top-up-please.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {ShareButtonsComponent} from './components/share-buttons/share-buttons.component';
import {CertificateComponent} from './components/certificate/certificate.component';
import {HopeComponent} from './components/certificate/hope/hope.component';
import {JoyComponent} from './components/certificate/joy/joy.component';

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
    ParserDirective,
    PrivacyPolicyComponent,
    TermsAndConditionsComponent,
    TopUpPleaseComponent,
    ShareButtonsComponent,
    CertificateComponent,
    HopeComponent,
    JoyComponent,
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
    ParserDirective,
    ShareButtonsComponent,
    CertificateComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatDividerModule,
    MatSidenavModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatDialogModule,
    RouterModule,
    MatTooltipModule,
    MarkdownModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
  ]
})
export class SharedModule {
}

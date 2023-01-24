import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CourseRoutingModule} from './course-routing.module';
import {SharedModule} from '../shared/shared.module';
import {CourseComponent} from './course/course.component';
import {LandingComponent} from './landing/landing.component';
import {MatIconModule} from '@angular/material/icon';
import {MatLegacyMenuModule as MatMenuModule} from '@angular/material/legacy-menu';
import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';
import {MatDividerModule} from '@angular/material/divider';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatLegacyCardModule as MatCardModule} from '@angular/material/legacy-card';
import {MatLegacyListModule as MatListModule} from '@angular/material/legacy-list';
import {LessonModule} from './course/lessons/lesson.module';
import {MatLegacyProgressSpinnerModule as MatProgressSpinnerModule} from '@angular/material/legacy-progress-spinner';
import {MatLegacyProgressBarModule as MatProgressBarModule} from '@angular/material/legacy-progress-bar';
import {ProgressComponent} from './course/progress/progress.component';
import {MarkdownModule} from 'ngx-markdown';
import {MatLegacySelectModule as MatSelectModule} from '@angular/material/legacy-select';
import {ReactiveFormsModule} from '@angular/forms';
import {MatLegacyRadioModule as MatRadioModule} from '@angular/material/legacy-radio';


@NgModule({
  declarations: [
    CourseComponent,
    LandingComponent,
    ProgressComponent,
  ],
    exports: [
        CourseComponent,
    ],
  imports: [
    CommonModule,
    CourseRoutingModule,
    SharedModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatDividerModule,
    MatSidenavModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MarkdownModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatRadioModule,
  ]
})
export class CourseModule {
}

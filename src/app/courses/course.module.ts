import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CourseRoutingModule} from './course-routing.module';
import {SharedModule} from '../shared/shared.module';
import {CourseComponent} from './course/course.component';
import {LandingComponent} from './landing/landing.component';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatSidenavModule} from '@angular/material/sidenav';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import { LessonModule } from './course/lessons/lesson.module';


@NgModule({
  declarations: [
    CourseComponent,
    LandingComponent
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
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    LessonModule,
  ]
})
export class CourseModule {
}

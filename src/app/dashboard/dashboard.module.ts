import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { LandingComponent } from './landing/landing.component';
import { ProfileComponent } from './profile/profile.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {SharedModule} from '../shared/shared.module';
import {CourseModule} from '../courses/course.module';


@NgModule({
  declarations: [
    LandingComponent,
    ProfileComponent
  ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        FlexLayoutModule,
        MatButtonModule,
        MatDividerModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
        SharedModule,
        CourseModule
    ]
})
export class DashboardModule { }

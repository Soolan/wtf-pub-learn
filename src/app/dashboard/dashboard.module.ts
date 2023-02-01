import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { LandingComponent } from './landing/landing.component';
import { ProfileComponent } from './profile/profile.component';
import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';
import {MatDividerModule} from '@angular/material/divider';
import {MatLegacyProgressSpinnerModule as MatProgressSpinnerModule} from '@angular/material/legacy-progress-spinner';
import {MatLegacyProgressBarModule as MatProgressBarModule} from '@angular/material/legacy-progress-bar';
import {SharedModule} from '../shared/shared.module';
import {CourseModule} from '../courses/course.module';
import {MatIconModule} from '@angular/material/icon';
import {ReactiveFormsModule} from '@angular/forms';
import {MatLegacySlideToggleModule as MatSlideToggleModule} from '@angular/material/legacy-slide-toggle';
import {MatLegacyFormFieldModule as MatFormFieldModule} from '@angular/material/legacy-form-field';
import {MatLegacyInputModule as MatInputModule} from '@angular/material/legacy-input';
import {MatExpansionModule} from '@angular/material/expansion';


@NgModule({
  declarations: [
    LandingComponent,
    ProfileComponent
  ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        MatButtonModule,
        MatDividerModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
        SharedModule,
        CourseModule,
        MatIconModule,
        ReactiveFormsModule,
        MatSlideToggleModule,
        MatFormFieldModule,
        MatInputModule,
        MatExpansionModule
    ]
})
export class DashboardModule { }

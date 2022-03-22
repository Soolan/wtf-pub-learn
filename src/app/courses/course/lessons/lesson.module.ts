import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LessonRoutingModule } from './lesson-routing.module';
import { LessonComponent } from './lesson/lesson.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    LessonComponent,
  ],
  imports: [
    CommonModule,
    LessonRoutingModule,
    FlexLayoutModule,
    MatProgressSpinnerModule
  ]
})
export class LessonModule {
}

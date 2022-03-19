import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LessonRoutingModule } from './lesson-routing.module';
import { LessonComponent } from './lesson/lesson.component';
import { LandingComponent } from './landing/landing.component';


@NgModule({
  declarations: [
    LessonComponent,
    LandingComponent
  ],
  imports: [
    CommonModule,
    LessonRoutingModule
  ]
})
export class LessonModule {
}

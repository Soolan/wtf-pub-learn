import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LessonComponent} from './lesson/lesson.component';
import {LandingComponent} from './landing/landing.component';

const routes: Routes = [
  {path: '', component: LandingComponent},
  {
    path: 'courses/:id/lessons/:id',
    component: LessonComponent,
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LessonRoutingModule { }

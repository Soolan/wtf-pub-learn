import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LessonComponent} from './lesson/lesson.component';

const routes: Routes = [
  {
    path: 'courses/:courseId/lessons/:lessonId',
    component: LessonComponent,
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LessonRoutingModule { }

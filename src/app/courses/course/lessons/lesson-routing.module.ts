import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LessonComponent} from './lesson/lesson.component';
import {FinalExamComponent} from './final-exam/final-exam.component';

const routes: Routes = [
  { path: ':lessonId', component: LessonComponent,  pathMatch: 'full'},
  { path: 'final-exam', component: FinalExamComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LessonRoutingModule { }

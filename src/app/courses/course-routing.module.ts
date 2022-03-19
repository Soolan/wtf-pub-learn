import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LandingComponent} from './landing/landing.component';
import {CourseComponent} from './course/course.component';

const routes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'courses/:id', component: CourseComponent},
  {
    path: 'lessons',
    loadChildren: () => import('./course/lessons/lesson.module')
      .then(m => m.LessonModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule {
}

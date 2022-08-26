import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LandingComponent} from './landing/landing.component';
import {ReleasesComponent} from './releases/releases.component';

const routes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'releases', component: ReleasesComponent},
  {
    path: 'courses',
    loadChildren: () => import('./courses/course.module')
      .then(m => m.CourseModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

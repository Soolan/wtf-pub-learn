import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LandingComponent} from './landing/landing.component';
import {ReleasesComponent} from './releases/releases.component';
import {canActivate, redirectUnauthorizedTo} from '@angular/fire/compat/auth-guard';
import {PageNotFoundComponent} from './shared/components/page-not-found/page-not-found.component';
import {AccessDeniedComponent} from './shared/components/access-denied/access-denied.component';
import {PrivacyPolicyComponent} from './shared/components/privacy-policy/privacy-policy.component';
import {TermsAndConditionsComponent} from './shared/components/terms-and-conditions/terms-and-conditions.component';
import {VerifyComponent} from './verify/verify.component';

const redirectUnauthorized = () => redirectUnauthorizedTo('/access-denied');

const routes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'releases', component: ReleasesComponent},
  {
    path: 'courses',
    loadChildren: () => import('./courses/course.module')
      .then(m => m.CourseModule),
  },

  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module')
      .then(m => m.DashboardModule),
    ...canActivate(redirectUnauthorized),
  },
  {path: 'verify', component: VerifyComponent},
  {path: 'verify/:courseId', component: VerifyComponent},
  {path: 'privacy-policy', component: PrivacyPolicyComponent},
  {path: 'terms-and-conditions', component: TermsAndConditionsComponent},
  {path: 'access-denied', component: AccessDeniedComponent},
  {path: '**', pathMatch: 'full', component: PageNotFoundComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

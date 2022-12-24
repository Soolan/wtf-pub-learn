import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LandingComponent} from './landing/landing.component';
import {ProfileComponent} from './profile/profile.component';
import {map} from 'rxjs';
import {canActivate} from '@angular/fire/compat/auth-guard';

const onlyAllowSelf = (next: any) => map((user: any) =>
  !!user && next.params.profileId === user.uid && user.emailVerified ? true : ['access-denied']
);

const routes: Routes = [
  {path: ':profileId', component: LandingComponent, ...canActivate(onlyAllowSelf)},
  {path: ':profileId/profile', component: ProfileComponent, ...canActivate(onlyAllowSelf)}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}

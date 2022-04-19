import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../guards/auth.guard';
import { ValidateAccountGuard } from '../guards/validate-guard.guard';

import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { RecoverAccountComponent } from '../components/recover-account/recover-account.component';
import { VerifyAccountComponent } from '../components/verify-account/verify-account.component';
import { OverviewComponent } from '../components/dashboard-items/overview/overview.component';
import { ExploreComponent } from '../components/dashboard-items/explore/explore.component';
import { RequestComponent } from '../components/dashboard-items/request/request.component';
import { CoOwnComponent } from '../components/dashboard-items/co-own/co-own.component';
import { ProfileComponent } from '../components/dashboard-items/profile/profile.component';



const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: DashboardComponent,
    children: [
      {
        path: 'overview',
        component: OverviewComponent
      },
      {
        path: 'explore',
        component: ExploreComponent
      },
      {
        path: 'co-own',
        component: CoOwnComponent
      },
      {
        path: 'requests',
        component: RequestComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
    ]
  },

  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'verify-account',
    component: VerifyAccountComponent
  },
  {
    path: 'recover-account',
    component: RecoverAccountComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/'
  }
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class RoutesModule { }

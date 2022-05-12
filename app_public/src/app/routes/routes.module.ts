import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../guards/auth.guard';

import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { RecoverAccountComponent } from '../components/recover-account/recover-account.component';
import { VerifyAccountComponent } from '../components/verify-account/verify-account.component';
import { OverviewComponent } from '../components/dashboard-items/overview/overview.component';
import { RequestComponent } from '../components/dashboard-items/request/request.component';
import { CoOwnComponent } from '../components/dashboard-items/co-own/co-own.component';
import { ProfileComponent } from '../components/dashboard-items/profile/profile.component';
import { UpdatePasswordComponent } from '../components/dashboard-items/update-password/update-password.component';
import { DeleteAccountComponent } from '../components/dashboard-items/delete-account/delete-account.component';



const routes: Routes = [
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: DashboardComponent,
    children: [
      {
        path: 'overview',
        component: OverviewComponent,
        pathMatch: 'full'
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
    path: 'update-password',
    canActivate: [AuthGuard],
    component: UpdatePasswordComponent
  },
  {
    path: 'delete-account',
    canActivate: [AuthGuard],
    component: DeleteAccountComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/dashboard/overview'
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

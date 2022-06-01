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
import { TransactionsPageComponent } from '../components/dashboard-items/transactions-page/transactions-page.component';
import { UsersComponent } from '../components/dashboard-items/users/users.component';
import { TransactionsComponent } from '../components/dashboard-items/transactions/transactions.component';
import { RequestResponseComponent } from '../components/dashboard-items/request-response/request-response.component'
import { PropertyPageComponent } from '../components/dashboard-items/property-page/property-page.component';
import { SuperAdminGuard } from '../guards/super-admin.guard';
import { AdminGuard } from '../guards/admin.guard';
import { UserGuard } from '../guards/user.guard';
import { UserOnlyGuard } from '../guards/user-only.guard';


const routes: Routes = [
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: DashboardComponent,
    children: [
      {
        path: 'overview',
        canActivate: [UserOnlyGuard],
        component: OverviewComponent,
      },
      {
        path: 'co-own',
        canActivate: [UserGuard],
        component: CoOwnComponent
      },
      {
        path: 'requests',
        canActivate: [UserGuard],
        component: RequestComponent
      },
      {
        path: 'properties',
        canActivate: [AdminGuard],
        component: PropertyPageComponent
      },
      {
        path: 'user/requests',
        canActivate: [AdminGuard],
        component: RequestResponseComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'users',
        canActivate: [SuperAdminGuard],
        component: UsersComponent
      },
      {
        path: 'transactions',
        canActivate: [SuperAdminGuard],
        component: TransactionsComponent
      },
    ]
  },
  {
    path: 'verify-transaction',
    canActivate: [AuthGuard],
    component: TransactionsPageComponent
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

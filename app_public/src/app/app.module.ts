import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { RoutesModule } from './routes/routes.module';

import { AuthGuard } from './guards/auth.guard';

import { FrameworkComponent } from './components/framework/framework.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RegisterComponent } from './components/register/register.component';
import { RecoverAccountComponent } from './components/recover-account/recover-account.component';
import { VerifyAccountComponent } from './components/verify-account/verify-account.component';
import { OverviewComponent } from './components/dashboard-items/overview/overview.component';
import { RequestComponent } from './components/dashboard-items/request/request.component';
import { CoOwnComponent } from './components/dashboard-items/co-own/co-own.component';
import { ProfileComponent } from './components/dashboard-items/profile/profile.component';
import { UpdatePasswordComponent } from './components/dashboard-items/update-password/update-password.component';
import { DeleteAccountComponent } from './components/dashboard-items/delete-account/delete-account.component';
import { VerifyPasswordComponent } from './components/dashboard-items/verify-password/verify-password.component';
import { PaginateComponent } from './components/dashboard-items/paginate/paginate.component';
import { HtmlLimeBreaksPipe } from './pipes/html-lime-breaks.pipe';
import { PropertyModalComponent } from './components/dashboard-items/property-modal/property-modal.component';
import { TransactionsPageComponent } from './components/dashboard-items/transactions-page/transactions-page.component';


@NgModule({
  declarations: [
    FrameworkComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    RegisterComponent,
    RecoverAccountComponent,
    VerifyAccountComponent,
    OverviewComponent,
    RequestComponent,
    CoOwnComponent,
    ProfileComponent,
    UpdatePasswordComponent,
    DeleteAccountComponent,
    VerifyPasswordComponent,
    PaginateComponent,
    HtmlLimeBreaksPipe,
    PropertyModalComponent,
    TransactionsPageComponent
  ],
  imports: [
    BrowserModule,
    RoutesModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    AuthGuard,
    Title
  ],
  bootstrap: [FrameworkComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { RoutesModule } from './routes/routes.module';

import { FrameworkComponent } from './components/framework/framework.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  declarations: [
    FrameworkComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    RoutesModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [FrameworkComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegistrationComponent } from './registration/registration.component';
import { RouterModule } from '@angular/router';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastrModule, } from 'ngx-toastr';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { SidenavComponent } from './sidenav/sidenav.component';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import { ChartModule } from 'primeng/chart';
import { ReportsComponent } from './expense/reports/reports.component';
import { CalendarModule } from 'primeng/calendar';
import { FloatLabelModule } from 'primeng/floatlabel';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidenavComponent,
    RegistrationComponent,
    ReportsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PasswordModule,
    CheckboxModule,
    CommonModule,
    ButtonModule,
    FormsModule,
    InputTextModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule,
    InputNumberModule,
    ToastModule,
    CardModule,
    TooltipModule,
    ChartModule,
    CalendarModule,
    FloatLabelModule,
    HttpClientModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',}),

  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }

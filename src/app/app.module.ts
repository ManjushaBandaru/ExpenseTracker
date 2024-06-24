import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { InputSwitchModule } from 'primeng/inputswitch';
import { DropdownModule } from 'primeng/dropdown';
import { AccordionModule } from 'primeng/accordion';
import { RippleModule } from 'primeng/ripple';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { MultiSelectModule } from 'primeng/multiselect';
import { DialogModule } from 'primeng/dialog';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidenavComponent,
    RegistrationComponent,
    ReportsComponent,
  ],
  imports: [
    BrowserModule,InputSwitchModule,DropdownModule,
    AppRoutingModule,AccordionModule,RippleModule,ToolbarModule,
    PasswordModule,TableModule,DialogModule,
    CheckboxModule,
    CommonModule,
    BrowserAnimationsModule,
    ButtonModule,
    FormsModule,
    InputTextModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule,MultiSelectModule,
    InputNumberModule,
    ToastModule,
    CardModule,
    TooltipModule,
    ChartModule,
    CalendarModule,
    FloatLabelModule,
    HttpClientModule,
    DialogModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',}),

  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { SuperAdminComponent } from './super-admin/super-admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UsersComponent } from '../Security/users/users.component';
import { RolesComponent } from '../Security/roles/roles.component';
import { CardModule } from 'primeng/card';
import { TotalexpensesinfoComponent } from './totalexpensesinfo/totalexpensesinfo.component';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ToolbarModule } from 'primeng/toolbar';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DashboardComponent,
    UserDashboardComponent,
    SuperAdminComponent,
    AdminDashboardComponent,
    UsersComponent,
    RolesComponent,
    TotalexpensesinfoComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    CardModule,
    ChartModule,
    TableModule,
    ButtonModule,
    DialogModule,
    ToolbarModule,
    ReactiveFormsModule,
  ]
})
export class DashboardModule { }

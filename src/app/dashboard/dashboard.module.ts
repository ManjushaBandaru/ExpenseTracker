import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { SuperAdminComponent } from './super-admin/super-admin.component';
import { AdminComponent } from './admin/admin.component';
import { Routes } from '@angular/router';
const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'admin', component: AdminComponent },
      { path: 'users', component: UserDashboardComponent },
     {path:'superadmin',component:SuperAdminComponent}
    ]
  }
];

@NgModule({
  declarations: [
    DashboardComponent,
    UserDashboardComponent,
    SuperAdminComponent,
    AdminComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }

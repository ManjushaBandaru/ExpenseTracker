import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolesComponent } from '../Security/roles/roles.component';
import { UsersComponent } from '../Security/users/users.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { DashboardComponent } from './dashboard.component';
import { SuperAdminComponent } from './super-admin/super-admin.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { TotalexpensesinfoComponent } from './totalexpensesinfo/totalexpensesinfo.component';
import { ReportsComponent } from '../expense/reports/reports.component';
import { LookupsComponent } from '../lookups/lookups.component';
import { DepositComponent } from '../deposit/deposit.component';

const routes: Routes = [
  { path: '', redirectTo: 'userDashboard', pathMatch: 'full' }, 
  { path: 'userDashboard', component: UserDashboardComponent },
  { path: 'superadminDashboard', component: SuperAdminComponent },
  { path: 'admin', component: AdminDashboardComponent },
  {path:'reports',component:ReportsComponent},

  { path: 'expenselist', component: TotalexpensesinfoComponent},
  { path: 'user', component: UsersComponent },
  { path: 'roles', component: RolesComponent },
  { path: 'lookups', component: LookupsComponent },
  { path: 'deposits', component: DepositComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

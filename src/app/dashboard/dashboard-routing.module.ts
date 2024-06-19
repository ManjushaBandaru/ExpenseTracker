import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { DashboardComponent } from './dashboard.component';
import { SuperAdminComponent } from './super-admin/super-admin.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, children: [
    { path: 'user', component: UserDashboardComponent },
    { path: 'superadmin', component: SuperAdminComponent },
    {path:'admin',component:AdminDashboardComponent},
    { path: '', redirectTo: 'user', pathMatch: 'full' }
  ]}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

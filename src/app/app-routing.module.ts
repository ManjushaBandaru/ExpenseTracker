import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { UserDashboardComponent } from './dashboard/user-dashboard/user-dashboard.component';
import { SuperAdminComponent } from './dashboard/super-admin/super-admin.component';
import { AdminDashboardComponent } from './dashboard/admin-dashboard/admin-dashboard.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { UsersComponent } from './Security/users/users.component';
import { LookupsComponent } from './lookups/lookups.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'sidenav',component:SidenavComponent,
    children: [
      { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
    ]
  },
  
  { path: 'registration', component: RegistrationComponent },
  { path: '**', redirectTo: '' } // Redirect any other path to LoginComponent
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

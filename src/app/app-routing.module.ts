import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { RegistrationComponent } from './registration/registration.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'sidenav', component: SidenavComponent },
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
  {path: 'registration', component : RegistrationComponent},
  {path: 'login', component : LoginComponent},
  // { path: 'dashboard', loadChildren: () => import('./admin-dashboard/admin-dashboard.module').then(m => m.AdminDashboardModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

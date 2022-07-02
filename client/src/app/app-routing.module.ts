import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './public/auth/login/login.component';
import {SignupComponent} from './public/auth/signup/signup.component';
import {AuthGuard} from './public/auth/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'suppliers', loadChildren: () => import('./suppliers/suppliers-routing.module')
      .then(m => m.SuppliersModule), canActivate: [AuthGuard] },
  { path: 'settings', loadChildren: () => import('./settings/settings-routing.module')
      .then(m => m.SettingsRoutingModule), canActivate: [AuthGuard] },
  { path: 'items', loadChildren: () => import('./items/items-routing.module')
      .then(m => m.ItemsRoutingModule), canActivate: [AuthGuard] },
  { path: 'clients', loadChildren: () => import('./clients/clients.module')
      .then(m => m.ClientsModule), canActivate: [AuthGuard] },
  { path: 'employees', loadChildren: () => import('./employees/employees.module')
      .then(m => m.EmployeesModule), canActivate: [AuthGuard] },
  { path: 'benefits', loadChildren: () => import('./benefits/benefits-routing.module')
      .then(m => m.CustomersRoutingModule), canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'items' , canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]

})
export class AppRoutingModule {}

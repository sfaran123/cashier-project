import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'company', loadChildren: () => import('./system-settings/system-setting.module').then(m => m.SystemSettingModule) },
  { path: 'company-form', loadChildren: () => import('./company-form/company-form.module').then(m => m.CompanyFormModule) },
  { path: 'store-form', loadChildren: () => import('./store-form/store-form.module').then(m => m.StoreFormModule) },
  { path: 'stores', loadChildren: () => import('./stores/stores.module').then(m => m.StoresModule) },
  { path: 'poses', loadChildren: () => import('./poses/poses.module').then(m => m.PosesModule) },
  { path: 'pos-form', loadChildren: () => import('./pos-form/pos-form.module').then(m => m.PosFormModule) },
  { path: 'stepper', loadChildren: () => import('./stepper/stepper.module').then(m => m.StepperModule) },

];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class SettingsRoutingModule {}

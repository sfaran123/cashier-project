import {NgModule} from '@angular/core';
import {SystemSettingsComponent} from './system-settings.component';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';

const routes: Routes = [
  { path: '', component: SystemSettingsComponent },
];

@NgModule({
  declarations: [SystemSettingsComponent],
  imports: [
    HttpClientModule,
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ]
})
export class SystemSettingModule {}

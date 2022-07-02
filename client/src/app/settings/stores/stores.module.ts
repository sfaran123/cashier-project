import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { DataTableModule } from 'src/app/shared/_components/data-table/data-table.module';

import { EmployeeService } from 'src/app/shared/_services/http/employee.service';
import { TranslateModule } from 'src/app/shared/_pipes/translation/translate.module';
import { NotificationService } from 'src/app/shared/_services/generic/notification.service';
import { MatTooltipModule } from '@angular/material';
import {StoresComponent} from './stores.component';
import {StoreService} from '../../shared/_services/http/store.service';

const routes: Routes = [
  { path: '', component: StoresComponent },
  { path: '', component: StoresComponent },
];

@NgModule({
  declarations: [StoresComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    DataTableModule,
    TranslateModule,
    MatTooltipModule,
  ],
  providers: [StoreService, NotificationService]
})
export class StoresModule {
}

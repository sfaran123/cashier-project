import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatTooltipModule } from '@angular/material';

import { BdSelectModule } from 'src/app/shared/_components/bd-select/bd-select.module';
import { DataTableModule } from 'src/app/shared/_components/data-table/data-table.module';
import { TranslateModule } from 'src/app/shared/_pipes/translation/translate.module';

import { SuppliersComponent } from './suppliers.component';

import { SupplierService } from 'src/app/shared/_services/http/supplier.service';
import { NotificationService } from 'src/app/shared/_services/generic/notification.service';

const routes: Routes = [
  { path: '', component: SuppliersComponent }
];

@NgModule({
  declarations: [SuppliersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DataTableModule,
    BdSelectModule,
    TranslateModule,
    MatTooltipModule
  ],
  providers: [SupplierService, NotificationService]
})
export class SuppliersModule {
}

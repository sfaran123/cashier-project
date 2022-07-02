import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from 'src/app/shared/_pipes/translation/translate.module';
import { DataTableModule } from 'src/app/shared/_components/data-table/data-table.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { BdSelectModule } from 'src/app/shared/_components/bd-select/bd-select.module';
import { ItemsListModule } from 'src/app/suppliers/invoices/items-list/items-list.module';

import { InvoicesComponent } from './invoices.component';

import { DocumentService } from 'src/app/shared/_services/http/document.service';
import { SupplierService } from 'src/app/shared/_services/http/supplier.service';
import { ItemService } from 'src/app/shared/_services/http/item.service';

import { SuppliersResolve } from 'src/app/shared/_resolves/suppliers.resolve';
import { ItemsSelectResolve } from 'src/app/shared/_resolves/items-select.resolve';

const routes: Routes = [
  {
    path: '',
    component: InvoicesComponent,
  },
  { path: 'form', loadChildren: () => import('./form/form.module').then(m => m.FormModule) }
];

@NgModule({
  declarations: [InvoicesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule,
    DataTableModule,
    MatTooltipModule,
    MatSelectModule,
    ReactiveFormsModule,
    BdSelectModule,
    ItemsListModule
  ],
  providers: [
    DocumentService,
    SuppliersResolve,
    SupplierService,
    ItemsSelectResolve,
    ItemService
  ]
})

export class InvoicesModule {}

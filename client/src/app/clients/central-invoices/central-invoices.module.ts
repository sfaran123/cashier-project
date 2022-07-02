import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DataTableModule } from 'src/app/shared/_components/data-table/data-table.module';
import { TranslateModule } from 'src/app/shared/_pipes/translation/translate.module';
import { MatTooltipModule } from '@angular/material/tooltip';

import { CentralInvoicesComponent } from './central-invoices.component';

import { CentralInvoiceService } from 'src/app/shared/_services/http/central-invoice.service';

const routes: Routes = [
  { path: '' , component: CentralInvoicesComponent },
  { path: 'form', loadChildren: () => import('./form/form.module').then(m => m.FormModule) }
];

@NgModule({
  declarations: [CentralInvoicesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DataTableModule,
    TranslateModule,
    MatTooltipModule
  ],
  providers: [CentralInvoiceService]
})
export class CentralInvoicesModule {}

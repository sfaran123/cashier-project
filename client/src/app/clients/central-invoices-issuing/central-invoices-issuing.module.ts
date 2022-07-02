import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DataTableModule } from 'src/app/shared/_components/data-table/data-table.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from 'src/app/shared/_pipes/translation/translate.module';

import { CentralInvoicesIssuingComponent } from './central-invoices-issuing.component';

import { DocumentService } from 'src/app/shared/_services/http/document.service';

const routes: Routes = [
  { path: '' , component: CentralInvoicesIssuingComponent },
  { path: 'form', loadChildren: () => import('./form/form.module').then(m => m.FormModule) }
];

@NgModule({
  declarations: [CentralInvoicesIssuingComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DataTableModule,
    MatTooltipModule,
    TranslateModule
  ],
  providers: [DocumentService]
})
export class CentralInvoicesIssuingModule {}

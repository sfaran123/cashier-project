import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { FormComponent } from './form.component';

import { CentralInvoiceService } from 'src/app/shared/_services/http/central-invoice.service';

import { CentralInvoiceResolve } from 'src/app/shared/_resolves/central-invoice.resolve';
import { TranslateModule } from 'src/app/shared/_pipes/translation/translate.module';
import { DocumentSummaryModule } from 'src/app/shared/_components/document-summary/document-summary.module';
import { MatButtonModule } from '@angular/material/button';

const routes: Routes = [
  { path: '', component: FormComponent },
  { path: ':id', component: FormComponent, resolve: { invoice: CentralInvoiceResolve } }
];

@NgModule({
  declarations: [FormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule,
    DocumentSummaryModule,
    MatButtonModule
  ],
  providers: [CentralInvoiceResolve, CentralInvoiceService]
})
export class FormModule {}

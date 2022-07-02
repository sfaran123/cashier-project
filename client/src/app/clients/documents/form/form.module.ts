import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BdSelectModule } from 'src/app/shared/_components/bd-select/bd-select.module';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ItemsListModule } from 'src/app/suppliers/invoices/items-list/items-list.module';
import { DocumentSummaryModule } from 'src/app/shared/_components/document-summary/document-summary.module';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from 'src/app/shared/_pipes/translation/translate.module';

import { FormComponent } from './form.component';

import { ClientsResolve } from 'src/app/shared/_resolves/clients.resolve';
import { DocumentResolve } from 'src/app/shared/_resolves/document.resolve';

const routes: Routes = [
  {
    path: '',
    component: FormComponent,
    resolve: { clients: ClientsResolve },
  },
  {
    path: ':id',
    component: FormComponent,
    resolve: { clients: ClientsResolve, document: DocumentResolve }
  }
];

@NgModule({
  declarations: [FormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    BdSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    ItemsListModule,
    DocumentSummaryModule,
    MatInputModule,
    TranslateModule
  ],
  providers: [ClientsResolve, DocumentResolve]
})
export class FormModule {}

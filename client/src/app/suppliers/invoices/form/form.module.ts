import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { BdSelectModule } from 'src/app/shared/_components/bd-select/bd-select.module';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from 'src/app/shared/_pipes/translation/translate.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ItemsListModule } from 'src/app/suppliers/invoices/items-list/items-list.module';

import { FormComponent } from './form.component';

import { SuppliersResolve } from 'src/app/shared/_resolves/suppliers.resolve';
import { DocumentResolve } from 'src/app/shared/_resolves/document.resolve';

import { DocumentService } from 'src/app/shared/_services/http/document.service';
import { DocumentSummaryModule } from 'src/app/shared/_components/document-summary/document-summary.module';

const routes: Routes = [
  {
    path: '',
    component: FormComponent,
    resolve: {
      suppliers: SuppliersResolve
    }
  },
  {
    path: ':id',
    component: FormComponent,
    resolve: {
      suppliers: SuppliersResolve,
      document: DocumentResolve
    }
  }
];

@NgModule({
  declarations: [FormComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatButtonModule,
        ReactiveFormsModule,
        BdSelectModule,
        MatInputModule,
        MatSelectModule,
        TranslateModule,
        MatCheckboxModule,
        ItemsListModule,
        DocumentSummaryModule
    ],
  providers: [DocumentResolve, DocumentService]
})
export class FormModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from 'src/app/shared/_pipes/translation/translate.module';
import { DataTableModule } from 'src/app/shared/_components/data-table/data-table.module';

import { DocumentsComponent } from './documents.component';

import { DocumentService } from 'src/app/shared/_services/http/document.service';

const routes: Routes = [
  { path: '', component: DocumentsComponent },
  { path: 'form', loadChildren: () => import('./form/form.module').then(m => m.FormModule) }
];

@NgModule({
  declarations: [DocumentsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTooltipModule,
    TranslateModule,
    DataTableModule
  ],
  providers: [DocumentService]
})
export class DocumentsModule {}

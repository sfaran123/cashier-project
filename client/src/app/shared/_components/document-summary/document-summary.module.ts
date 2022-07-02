import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from 'src/app/shared/_pipes/translation/translate.module';

import { DocumentSummaryComponent } from './document-summary.component';

import { DocumentService } from 'src/app/shared/_services/http/document.service';

import { DocumentResolve } from 'src/app/shared/_resolves/document.resolve';

@NgModule({
  declarations: [DocumentSummaryComponent],
  exports: [
    DocumentSummaryComponent
  ],
  imports: [
    CommonModule,
    TranslateModule
  ],
  providers: [DocumentService, DocumentResolve]
})
export class DocumentSummaryModule { }

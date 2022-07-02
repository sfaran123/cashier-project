import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';

import { DocumentSummaryComponent } from 'src/app/shared/_components/document-summary/document-summary.component';
import { ItemsListComponent } from 'src/app/suppliers/invoices/items-list/items-list.component';

import { CentralInvoiceModel } from 'src/app/shared/_models/central-invoice.model';
import { DocumentForm } from 'src/app/shared/_consts/forms/document';
import { DocumentModel } from 'src/app/shared/_models/document.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.styl']
})
export class FormComponent implements OnInit {

  @ViewChild(DocumentSummaryComponent, { static: true }) documentSummaryComponent: DocumentSummaryComponent;

  invoice: CentralInvoiceModel;

  documentForm: FormGroup;

  document: DocumentModel;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.invoice = this.route.snapshot.data.invoice;
    this.documentForm = new DocumentForm().form();

    if (this.document) {
      this.documentForm.patchValue(this.document);
    }

    this.documentForm.get('entityType').setValue('supplier');
    this.calculate();
  }

  calculate(): void {
    this.documentSummaryComponent.calculate(this.documentForm, this.invoice.documents);
  }
}

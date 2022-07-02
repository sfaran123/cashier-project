import { Component, ViewChild } from '@angular/core';

import { DataTableComponent } from 'src/app/shared/_components/data-table/data-table.component';

import { DocumentService } from 'src/app/shared/_services/http/document.service';
import { DocumentTypes } from 'src/app/shared/_models/document.model';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html'
})
export class InvoicesComponent {

  @ViewChild(DataTableComponent, { static: true }) dataTable: DataTableComponent;

  constructor(private documentService: DocumentService) {}

  readonly columns = [
    { name: 'supplier', label: 'SUPPLIER' },
    { name: 'date', label: 'DATE' }, { name: 'sum', label: 'SUM' },
    { name: 'reference', label: 'REFERENCE_NUMBER' },
    { name: 'status', label: 'STATUS' },
    { name: 'type', label: 'DOCUMENT_TYPE' },
    { name: 'paymentStatus', label: 'PAYMENT_STATUS' },
    { name: 'paymentDate', label: 'PAYMENT_DATE' },
    { name: 'paymentType', label: 'PAYMENT_TYPE' },
    { name: 'centralInvoiceNumber', label: 'CENTRAL_INVOICE_NUMBER' }
  ];

  readonly documentTypes = DocumentTypes;

  fetchItems(): void {
    this.documentService.getDocuments(this.dataTable.criteria, 'supplier').then(response => this.dataTable.setItems(response));
  }

  deleteInvoice(id: number): void {
    this.documentService.deleteDocument(id).then(() => this.fetchItems());
  }
}

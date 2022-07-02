import { Component, ViewChild } from '@angular/core';

import { DataTableComponent } from 'src/app/shared/_components/data-table/data-table.component';

import { DocumentService } from 'src/app/shared/_services/http/document.service';

@Component({
  selector: 'app-central-invoices-issuing',
  templateUrl: './central-invoices-issuing.component.html'
})
export class CentralInvoicesIssuingComponent {

  @ViewChild(DataTableComponent, { static: true }) dataTable: DataTableComponent;

  constructor(private documentService: DocumentService) {}

  readonly columns = [
    { name: 'IDNumber', label: 'ID_NUMBER' },
    { name: 'number', label: 'CLIENT_NUMBER' },
    { name: 'firstName', label: 'FIRST_NAME' },
    { name: 'lastName', label: 'LAST_NAME' },
    { name: 'sum', label: 'SUM' }
  ];

  fetchItems(): void {
    this.documentService.getClientsDocumentsSummary(this.dataTable.criteria).then(response => this.dataTable.setItems(response));
  }
}

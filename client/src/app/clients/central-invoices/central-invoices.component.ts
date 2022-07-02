import { Component, ViewChild } from '@angular/core';

import { DataTableComponent } from 'src/app/shared/_components/data-table/data-table.component';

import { CentralInvoiceService } from 'src/app/shared/_services/http/central-invoice.service';

@Component({
  selector: 'app-central-invoices',
  templateUrl: './central-invoices.component.html'
})
export class CentralInvoicesComponent {

  @ViewChild(DataTableComponent, { static: true }) dataTable: DataTableComponent;

  constructor(private centralInvoiceService: CentralInvoiceService) {}

  readonly columns = [
    { name: 'number', label: 'INVOICE_NUMBER' },
    { name: 'date', label: 'DATE' },
    { name: 'clientNumber', label: 'CLIENT_NAME' },
    { name: 'sum', label: 'SUM' }
  ];

  fetchItems(): void {
    this.centralInvoiceService.getInvoices(this.dataTable.criteria).then(response => this.dataTable.setItems(response));
  }
}

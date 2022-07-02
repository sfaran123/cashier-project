import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { DataTableComponent } from 'src/app/shared/_components/data-table/data-table.component';

import { DocumentService } from 'src/app/shared/_services/http/document.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html'
})
export class DocumentsComponent implements OnInit {

  @ViewChild(DataTableComponent, { static: true }) dataTable: DataTableComponent;

  constructor(private documentService: DocumentService, private router: Router) {}

  readonly columns = [
    { name: 'name', label: 'NAME' },
    { name: 'date', label: 'DATE' }, { name: 'sum', label: 'SUM' },
    { name: 'reference', label: 'REFERENCE_NUMBER' }
  ];

  title: string;

  docType: string;

  ngOnInit(): void {
    this.docType = this.router.url.split('/')[2] === 'offer-prices' ? 'offerPrice' : 'shippingCertificate';
    this.title = this.docType === 'offerPrice' ? 'OFFER_PRICE' : 'SHIPPING_CERTIFICATE';
  }

  fetchItems(): void {
    this.documentService.getDocuments(this.dataTable.criteria, 'client', this.docType).then(response => this.dataTable.setItems(response));
  }

  deleteInvoice(docId: number): void {
    this.documentService.deleteDocument(docId).then(() => this.fetchItems());
  }
}

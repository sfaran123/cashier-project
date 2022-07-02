import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseHttpService } from './base-http.service';

import { DataTableResponse } from 'src/app/shared/_components/data-table/classes/data-table-response';
import { DataTableCriteria } from 'src/app/shared/_components/data-table/classes/data-table-criteria';
import { CentralInvoiceModel } from 'src/app/shared/_models/central-invoice.model';

@Injectable()
export class CentralInvoiceService extends BaseHttpService {

  private readonly endPoint = this.apiUrl + '/central-invoice';

  constructor(private http: HttpClient) {
    super();
  }

  getInvoices(criteria: DataTableCriteria): Promise<DataTableResponse> {
    return this.http.post(this.endPoint + '/search', this.setDataTableParams(criteria))
      .toPromise()
      .then(response => response as DataTableResponse)
      .catch(() => null);
  }

  getInvoice(invoiceId: number): Promise<CentralInvoiceModel> {
    return this.http.get(this.endPoint + '/' + invoiceId)
      .toPromise()
      .then(response => response as CentralInvoiceModel)
      .catch(() => null);
  }

  newInvoice(values: object): Promise<boolean> {
    return this.http.post(this.endPoint, values)
      .toPromise()
      .then(() => true)
      .catch(() => null);
  }

  updateInvoice(values: object, documentId: number, updateInventory: boolean): Promise<boolean> {
    Object.assign(values, { updateInventory });

    return this.http.put(this.endPoint + '/' + documentId, values)
      .toPromise()
      .then(() => true)
      .catch(() => false);
  }

  deleteInvoice(documentId: number): Promise<boolean> {
    return this.http.delete(this.endPoint + '/' + documentId)
      .toPromise()
      .then(() => true)
      .catch(() => false);
  }

  getClientsDocumentsSummary(criteria: DataTableCriteria): Promise<DataTableResponse> {
    return this.http.post(this.endPoint + '/clientsDocumentsSummary', this.setDataTableParams(criteria))
      .toPromise()
      .then(response => response as DataTableResponse)
      .catch(() => null);
  }
}

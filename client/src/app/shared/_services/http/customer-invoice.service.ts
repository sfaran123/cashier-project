import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseHttpService } from './base-http.service';

import { DataTableResponse } from 'src/app/shared/_components/data-table/classes/data-table-response';
import { DataTableCriteria } from 'src/app/shared/_components/data-table/classes/data-table-criteria';


@Injectable()
export class CustomerInvoiceService extends BaseHttpService {

  private readonly endPoint = this.apiUrl + '/invoice';

  constructor(private http: HttpClient) {
    super();
  }

  getCustomersInvoices(criteria: DataTableCriteria): Promise<DataTableResponse> {
    return this.http.post(this.endPoint + '/invoices', this.setDataTableParams(criteria))
      .toPromise()
      .then(response => response as DataTableResponse)
      .catch(() => null);
  }

}

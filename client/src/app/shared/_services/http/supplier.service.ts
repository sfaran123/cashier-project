import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseHttpService } from './base-http.service';

import { DataTableResponse } from 'src/app/shared/_components/data-table/classes/data-table-response';
import { DataTableCriteria } from 'src/app/shared/_components/data-table/classes/data-table-criteria';
import { SupplierModel } from 'src/app/shared/_models/supplier.model';
import { SelectItem } from 'src/app/shared/_consts/select-item';

@Injectable()
export class SupplierService extends BaseHttpService {

  private readonly endPoint = this.apiUrl + '/supplier';

  constructor(private http: HttpClient) {
    super();
  }

  getSuppliers(criteria: DataTableCriteria): Promise<DataTableResponse> {
    return this.http.post(this.endPoint + '/search', this.setDataTableParams(criteria))
      .toPromise()
      .then(response => response as DataTableResponse)
      .catch(() => null);
  }

  getSupplier(supplierId: number): Promise<SupplierModel> {
    return this.http.get(this.endPoint + '/' + supplierId)
      .toPromise()
      .then(response => response as SupplierModel)
      .catch(() => null);
  }

  selectSupplier(): Promise<SelectItem[]> {
    return this.http.get(this.apiUrl + '/suppliers' + '/select')
      .toPromise()
      .then(response => response as SelectItem[])
      .catch(() => []);
  }


  newSupplier(values: object): Promise<any> {
    return this.http.post(this.endPoint, values)
      .toPromise()
      .then(response => response)
      .catch(() => null);
  }

  updateSupplier(values: object, supplierId: number): Promise<boolean> {
    return this.http.put(this.endPoint + '/' + supplierId, values)
      .toPromise()
      .then(() => true)
      .catch(() => false);
  }

  deleteSupplier(supplierId: number): Promise<boolean> {
    return this.http.delete(this.endPoint + '/' + supplierId)
      .toPromise()
      .then(() => true)
      .catch(() => false);
  }
}

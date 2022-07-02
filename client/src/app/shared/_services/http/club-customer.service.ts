import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseHttpService } from './base-http.service';

import { DataTableResponse } from 'src/app/shared/_components/data-table/classes/data-table-response';
import { DataTableCriteria } from 'src/app/shared/_components/data-table/classes/data-table-criteria';
import { ClubCustomerModel } from 'src/app/shared/_models/club-customer.model';


@Injectable()
export class ClubCustomerService extends BaseHttpService {

  private readonly endPoint = this.apiUrl + '/club-customer';

  constructor(private http: HttpClient) {
    super();
  }

  getClubCustomers(criteria: DataTableCriteria): Promise<DataTableResponse> {
    return this.http.post(this.endPoint + '/employees', this.setDataTableParams(criteria))
      .toPromise()
      .then(response => response as DataTableResponse)
      .catch(() => null);
  }

  getClubCustomer(customerId: number): Promise<ClubCustomerModel> {
    return this.http.get(this.endPoint + '/' + customerId)
      .toPromise()
      .then(response => response as ClubCustomerModel)
      .catch(() => null);
  }

  newClubCustomer(values: object): Promise<any> {
    return this.http.post(this.endPoint, values)
      .toPromise()
      .then(response => response)
      .catch(() => null);
  }

  updateClubCustomer(values: object, customerId: number): Promise<boolean> {
    return this.http.put(this.endPoint + '/' + customerId, values)
      .toPromise()
      .then(() => true)
      .catch(() => false);
  }

  deleteClubCustomer(customerId: number): Promise<boolean> {
    return this.http.delete(this.endPoint + '/' + customerId)
      .toPromise()
      .then(() => true)
      .catch(() => false);
  }
}

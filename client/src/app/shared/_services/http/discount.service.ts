import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseHttpService } from './base-http.service';

import { DataTableResponse } from 'src/app/shared/_components/data-table/classes/data-table-response';
import { DataTableCriteria } from 'src/app/shared/_components/data-table/classes/data-table-criteria';

import { DiscountModel } from 'src/app/shared/_models/discount.model';

@Injectable()
export class DiscountService extends BaseHttpService {

  private readonly endPoint = this.apiUrl + '/discount';

  constructor(private http: HttpClient) {
    super();
  }

  getDiscounts(criteria: DataTableCriteria): Promise<DataTableResponse> {
    return this.http.post(this.endPoint + '/discounts', this.setDataTableParams(criteria))
      .toPromise()
      .then(response => response as DataTableResponse)
      .catch(() => null);
  }

  getDiscount(discountId: number): Promise<DiscountModel> {
    return this.http.get(this.endPoint + '/' + discountId)
      .toPromise()
      .then(response => response as DiscountModel)
      .catch(() => null);
  }

  newDiscount(values: object): Promise<any> {
    return this.http.post(this.endPoint, values)
      .toPromise()
      .then(response => response)
      .catch(() => null);
  }

  updateDiscount(values: object, discountId: number): Promise<boolean> {
    return this.http.put(this.endPoint + '/' + discountId, values)
      .toPromise()
      .then(() => true)
      .catch(() => false);
  }

  deleteDiscount(discountId: number): Promise<boolean> {
    return this.http.delete(this.endPoint + '/' + discountId)
      .toPromise()
      .then(() => true)
      .catch(() => false);
  }
}

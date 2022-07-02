import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseHttpService } from './base-http.service';

import { DataTableResponse } from 'src/app/shared/_components/data-table/classes/data-table-response';
import { DataTableCriteria } from 'src/app/shared/_components/data-table/classes/data-table-criteria';

import { ItemModel } from 'src/app/shared/_models/item.model';
import { SelectItem } from 'src/app/shared/_consts/select-item';
import { ItemInventoryModel } from 'src/app/shared/_models/item-inventory.model';
import {EmployeeModel} from '../../_models/employee.model';
import {StoreModel} from '../../_models/store.model';

@Injectable()
export class StoreService extends BaseHttpService {

  private readonly endPoint = this.apiUrl + '/store';

  constructor(private http: HttpClient) {
    super();
  }

  newStore(values: object): Promise<any> {
    return this.http.post(this.endPoint, values)
      .toPromise()
      .then(response => response)
      .catch(() => null);
  }

  getStores(criteria: DataTableCriteria): Promise<DataTableResponse> {
    return this.http.post(this.endPoint + '/search', this.setDataTableParams(criteria))
      .toPromise()
      .then(response => response as DataTableResponse)
      .catch(() => null);
  }

  getStore(storeId: number): Promise<StoreModel> {
    return this.http.get(this.endPoint + '/' + storeId)
      .toPromise()
      .then(response => response as StoreModel)
      .catch(() => null);
  }


  updateStore(values: object, itemId: string): Promise<boolean> {
    return this.http.put(this.endPoint + '/' + itemId, values)
      .toPromise()
      .then(() => true)
      .catch(() => false);
  }

  deleteStore(StoreId: number): Promise<boolean> {
    return this.http.delete(this.endPoint + '/' + StoreId)
      .toPromise()
      .then(() => true)
      .catch(() => false);
  }
}

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
import {PosModel} from '../../_models/pos.model';

@Injectable()
export class PosService extends BaseHttpService {

  private readonly endPoint = this.apiUrl + '/pos';

  constructor(private http: HttpClient) {
    super();
  }

  newPos(values: object): Promise<any> {
    return this.http.post(this.endPoint, values)
      .toPromise()
      .then(response => response)
      .catch(() => null);
  }

  getPoses(criteria: DataTableCriteria): Promise<DataTableResponse> {
    return this.http.post(this.endPoint + '/search', this.setDataTableParams(criteria))
      .toPromise()
      .then(response => response as DataTableResponse)
      .catch(() => null);
  }

  getPos(posId): Promise<PosModel> {
    return this.http.get(this.endPoint + '/' + posId)
      .toPromise()
      .then(response => response as PosModel)
      .catch(() => null);
  }


  updatePos(values: object, itemId: number): Promise<boolean> {
    return this.http.put(this.endPoint + '/' + itemId, values)
      .toPromise()
      .then(() => true)
      .catch(() => false);
  }

  deletePos(posId: number): Promise<boolean> {
    return this.http.delete(this.endPoint + '/' + posId)
      .toPromise()
      .then(() => true)
      .catch(() => false);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseHttpService } from './base-http.service';

import { DataTableResponse } from 'src/app/shared/_components/data-table/classes/data-table-response';
import { DataTableCriteria } from 'src/app/shared/_components/data-table/classes/data-table-criteria';

import { ItemModel } from 'src/app/shared/_models/item.model';
import { SelectItem } from 'src/app/shared/_consts/select-item';
import { ItemInventoryModel } from 'src/app/shared/_models/item-inventory.model';

@Injectable()
export class ItemService extends BaseHttpService {

  private readonly endPoint = this.apiUrl + '/item';

  constructor(private http: HttpClient) {
    super();
  }

  getItems(criteria: DataTableCriteria): Promise<DataTableResponse> {
    return this.http.post(this.endPoint + '/search', this.setDataTableParams(criteria))
      .toPromise()
      .then(response => response as DataTableResponse)
      .catch(() => null);
  }

  selectItems(): Promise<SelectItem[]> {
    return this.http.get(this.endPoint + '/select')
      .toPromise()
      .then(response => response as SelectItem[])
      .catch(() => []);
  }

  selectWithInventories(): Promise<ItemInventoryModel[]> {
    return this.http.get(this.endPoint + '/selectWithInventories')
      .toPromise()
      .then(response => response as ItemInventoryModel[])
      .catch(() => []);
  }

  getItem(itemId: number): Promise<ItemModel> {
    return this.http.get(this.endPoint + '/' + itemId)
      .toPromise()
      .then(response => response as ItemModel)
      .catch(() => null);
  }

  newItem(values: object): Promise<any> {
    return this.http.post(this.endPoint, values)
      .toPromise()
      .then(response => response)
      .catch(() => null);
  }

  updateItem(values: object, itemId: number): Promise<boolean> {
    return this.http.put(this.endPoint + '/' + itemId, values)
      .toPromise()
      .then(() => true)
      .catch(() => false);
  }

  checkCodeExists(value: number): Promise<{ exists: boolean }> {
    return this.http.post(this.endPoint + '/checkCodeExists', { value })
      .toPromise()
      .then(response => response)
      .catch(() => null);
  }

  deleteItem(itemId: number): Promise<boolean> {
    return this.http.delete(this.endPoint + '/' + itemId)
      .toPromise()
      .then(() => true)
      .catch(() => false);
  }
}

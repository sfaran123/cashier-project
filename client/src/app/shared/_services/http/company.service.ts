import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseHttpService } from './base-http.service';

import { DataTableResponse } from 'src/app/shared/_components/data-table/classes/data-table-response';
import { DataTableCriteria } from 'src/app/shared/_components/data-table/classes/data-table-criteria';

import { ItemModel } from 'src/app/shared/_models/item.model';
import { SelectItem } from 'src/app/shared/_consts/select-item';
import { ItemInventoryModel } from 'src/app/shared/_models/item-inventory.model';

@Injectable()
export class CompanyService extends BaseHttpService {

  private readonly endPoint = this.apiUrl + '/company';

  constructor(private http: HttpClient) {
    super();
  }

  newCompany(values: object): Promise<any> {
    return this.http.post(this.endPoint, values)
      .toPromise()
      .then(response => response)
      .catch(() => null);
  }

  updateCompany(values: object, itemId: number): Promise<boolean> {
    return this.http.put(this.endPoint + '/' + itemId, values)
      .toPromise()
      .then(() => true)
      .catch(() => false);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SelectItem } from 'src/app/shared/_consts/select-item';

import { BaseHttpService } from './base-http.service';

import { DataTableResponse } from 'src/app/shared/_components/data-table/classes/data-table-response';
import { DataTableCriteria } from 'src/app/shared/_components/data-table/classes/data-table-criteria';
import { SetModel } from 'src/app/shared/_models/set.model';


@Injectable()
export class SetService extends BaseHttpService {

  private readonly endPoint = this.apiUrl + '/set';

  constructor(private http: HttpClient) {
    super();
  }

  getSets(criteria?: DataTableCriteria): Promise<DataTableResponse> {
    const params  = criteria ? this.setDataTableParams(criteria) : null;

    return this.http.post(this.endPoint + '/search', params)
      .toPromise()
      .then(response => response as DataTableResponse)
      .catch(() => null);
  }

  getSet(setId: number): Promise<SetModel> {
    return this.http.get(this.endPoint + '/' + setId)
      .toPromise()
      .then(response => response as SetModel)
      .catch(() => null);
  }

  selectSets(): Promise<SelectItem[]> {
    return this.http.get(this.endPoint + '/select')
      .toPromise()
      .then(response => response as SelectItem[])
      .catch(() => null);
  }

  newSet(values: object): Promise<any> {
    return this.http.post(this.endPoint, values)
      .toPromise()
      .then(response => response)
      .catch(() => null);
  }

  updateSet(values: object, setId: number): Promise<boolean> {
    return this.http.put(this.endPoint + '/' + setId, values)
      .toPromise()
      .then(() => true)
      .catch(() => false);
  }

  deleteSet(setId: number): Promise<boolean> {
    return this.http.delete(this.endPoint + '/' + setId)
      .toPromise()
      .then(() => true)
      .catch(() => false);
  }
}

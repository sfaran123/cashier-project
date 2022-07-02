import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SelectItem } from 'src/app/shared/_consts/select-item';

import { BaseHttpService } from './base-http.service';

import { DataTableResponse } from 'src/app/shared/_components/data-table/classes/data-table-response';
import { DataTableCriteria } from 'src/app/shared/_components/data-table/classes/data-table-criteria';
import { GroupModel } from 'src/app/shared/_models/group.model';


@Injectable()
export class GroupService extends BaseHttpService {

  private readonly endPoint = this.apiUrl + '/group';

  constructor(private http: HttpClient) {
    super();
  }

  getGroups(type: string, criteria?: DataTableCriteria): Promise<DataTableResponse> {
    const params = criteria ? this.setDataTableParams(criteria) : null;

    if (params) {
      Object.assign(params, { type });
    }

    return this.http.post(this.apiUrl + '/groups', params)
      .toPromise()
      .then(response => response as DataTableResponse)
      .catch(() => null);
  }

  getGroup(groupId: number): Promise<GroupModel> {
    return this.http.get(this.endPoint + '/' + groupId)
      .toPromise()
      .then(response => response as GroupModel)
      .catch(() => null);
  }

  selectGroups(type: string): Promise<SelectItem[]> {
    return this.http.get(this.endPoint + '/select', this.getTokenRequest({ type }))
      .toPromise()
      .then(response => response as SelectItem[])
      .catch(() => []);
  }

  newGroup(values: object, type: string): Promise<any> {
    Object.assign(values, { type });

    return this.http.post(this.endPoint, values)
      .toPromise()
      .then(response => response)
      .catch(() => null);
  }

  updateGroup(values: object, groupId: number): Promise<boolean> {
    return this.http.put(this.endPoint + '/' + groupId, values)
      .toPromise()
      .then(() => true)
      .catch(() => false);
  }

  deleteGroup(groupId: number): Promise<boolean> {
    return this.http.delete(this.endPoint + '/' + groupId)
      .toPromise()
      .then(() => true)
      .catch(() => false);
  }
}

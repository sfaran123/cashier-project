import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { BaseHttpService } from './base-http.service';

import { DataTableResponse } from 'src/app/shared/_components/data-table/classes/data-table-response';
import { DataTableCriteria } from 'src/app/shared/_components/data-table/classes/data-table-criteria';

import { ClientModel } from 'src/app/shared/_models/client.model';
import { SelectItem } from 'src/app/shared/_consts/select-item';

@Injectable()
export class ClientService extends BaseHttpService {

  private readonly endPoint = this.apiUrl + '/client';

  constructor(private http: HttpClient) {
    super();
  }

  getClients(criteria: DataTableCriteria): Promise<DataTableResponse> {
    return this.http.post(this.endPoint + '/search', this.setDataTableParams(criteria))
      .toPromise()
      .then(response => response as DataTableResponse)
      .catch(() => null);
  }

  getClient(clientId: number): Promise<ClientModel> {
    return this.http.get(this.endPoint + '/' + clientId)
      .toPromise()
      .then(response => response as ClientModel)
      .catch(() => null);
  }

  selectClient(): Promise<SelectItem[]> {
    return this.http.get(this.endPoint + '/select')
      .toPromise()
      .then(response => response as SelectItem[])
      .catch(() => []);
  }

  newClient(values: object): Promise<any> {
    return this.http.post(this.endPoint, values)
      .toPromise()
      .then(response => response)
      .catch(() => null);
  }

  updateClient(values: object, clientId: number): Promise<boolean> {
    return this.http.put(this.endPoint + '/' + clientId, values)
      .toPromise()
      .then(() => true)
      .catch(() => false);
  }

  deleteClient(clientId: number): Promise<boolean> {
    return this.http.delete(this.endPoint + '/' + clientId)
      .toPromise()
      .then(() => true)
      .catch(() => false);
  }

  getParents(clientId: number): Promise<SelectItem[]> {
    return this.http.get(this.endPoint + '/parent', this.getTokenRequest({ clientId }))
      .toPromise()
      .then((response) => response as SelectItem[])
      .catch(() => []);
  }
}

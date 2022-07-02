import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseHttpService } from './base-http.service';

import { DataTableResponse } from 'src/app/shared/_components/data-table/classes/data-table-response';
import { DataTableCriteria } from 'src/app/shared/_components/data-table/classes/data-table-criteria';
import { SelectItem } from 'src/app/shared/_consts/select-item';
import { DocumentModel } from 'src/app/shared/_models/document.model';

@Injectable()
export class DocumentService extends BaseHttpService {

  private readonly endPoint = this.apiUrl + '/document';

  constructor(private http: HttpClient) {
    super();
  }

  getDocuments(criteria: DataTableCriteria, entityType: string, docType?: string): Promise<DataTableResponse> {
    const params = { entityType, documentType: docType ? docType : null };
    return this.http.post(this.endPoint + '/search', this.setDataTableParams(criteria, params))
      .toPromise()
      .then(response => response as DataTableResponse)
      .catch(() => null);
  }

  getDocument(documentId: number): Promise<DocumentModel> {
    return this.http.get(this.endPoint + '/' + documentId)
      .toPromise()
      .then(response => response as DocumentModel)
      .catch(() => null);
  }

  selectDocument(): Promise<SelectItem[]> {
    return this.http.get(this.endPoint + '/select')
      .toPromise()
      .then(response => response as SelectItem[])
      .catch(() => []);
  }

  newDocument(values: object, updateInventory: boolean): Promise<boolean> {
    Object.assign(values, { updateInventory });

    return this.http.post(this.endPoint, values)
      .toPromise()
      .then(() => true)
      .catch(() => null);
  }

  updateDocument(values: object, documentId: number, updateInventory: boolean): Promise<boolean> {
    Object.assign(values, { updateInventory });

    return this.http.put(this.endPoint + '/' + documentId, values)
      .toPromise()
      .then(() => true)
      .catch(() => false);
  }

  deleteDocument(documentId: number): Promise<boolean> {
    return this.http.delete(this.endPoint + '/' + documentId)
      .toPromise()
      .then(() => true)
      .catch(() => false);
  }

  getClientsDocumentsSummary(criteria: DataTableCriteria): Promise<DataTableResponse> {
    return this.http.post(this.endPoint + '/clientsDocumentsSummary', this.setDataTableParams(criteria))
      .toPromise()
      .then(response => response as DataTableResponse)
      .catch(() => null);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseHttpService } from './base-http.service';

import { DataTableCriteria } from 'src/app/shared/_components/data-table/classes/data-table-criteria';
import { DataTableResponse } from 'src/app/shared/_components/data-table/classes/data-table-response';
import { MenuElementModel } from 'src/app/shared/_models/menu-element.model';
import { MenuItemModel } from 'src/app/shared/_models/menu-item.model';

@Injectable()
export class MenuElementService extends BaseHttpService {

  private readonly endPoint = this.apiUrl + '/menu-element';

  constructor(private http: HttpClient) {
    super();
  }

  getMenuElements(criteria: DataTableCriteria, parentId: number, type?: string): Promise<DataTableResponse> {
    return this.http.post(this.endPoint + '/search', this.setDataTableParams(criteria, { type }))
      .toPromise()
      .then(response => response as DataTableResponse)
      .catch(() => null);
  }

  getMainMenuItems(): Promise<MenuItemModel> {
    return this.http.get(this.endPoint + '/main-menu-items', this.getTokenRequest())
      .toPromise()
      .then(response => response as MenuItemModel)
      .catch(() => null);
  }

  getMenuElement(elementMenuId: number): Promise<MenuElementModel> {
    return this.http.get(this.endPoint + '/' + elementMenuId)
      .toPromise()
      .then(response => response as MenuElementModel)
      .catch(() => null);
  }


  newMenuElement(values: object): Promise<any> {
    return this.http.post(this.endPoint, values)
      .toPromise()
      .then(response => response)
      .catch(() => null);
  }

  updateMenuElement(values: object, elementMenuId: number): Promise<boolean> {
    return this.http.put(this.endPoint + '/' + elementMenuId, values)
      .toPromise()
      .then(() => true)
      .catch(() => false);
  }

  updateMainMenuItems(values: object): Promise<boolean> {
    return this.http.put(this.endPoint + '/main-menu-items', values)
      .toPromise()
      .then(() => true)
      .catch(() => false);
  }

  deleteMenuElement(elementMenuId: number): Promise<boolean> {
    return this.http.delete(this.endPoint + '/' + elementMenuId)
      .toPromise()
      .then(() => true)
      .catch(() => false);
  }
}

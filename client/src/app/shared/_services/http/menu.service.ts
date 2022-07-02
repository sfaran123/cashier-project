import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SelectItem } from 'src/app/shared/_consts/select-item';

import { BaseHttpService } from './base-http.service';

import { DataTableResponse } from 'src/app/shared/_components/data-table/classes/data-table-response';
import { DataTableCriteria } from 'src/app/shared/_components/data-table/classes/data-table-criteria';
import { CategoryModel } from 'src/app/shared/_models/category.model';
import { MenuModel } from 'src/app/shared/_models/menu.model';


@Injectable()
export class MenuService extends BaseHttpService {

  private readonly endPoint = this.apiUrl + '/menu';

  constructor(private http: HttpClient) {
    super();
  }

  getMenus(criteria: DataTableCriteria): Promise<DataTableResponse> {
    return this.http.post(this.apiUrl + '/menus', this.setDataTableParams(criteria))
      .toPromise()
      .then(response => response as DataTableResponse)
      .catch(() => null);
  }

  getMenu(menuId: number): Promise<MenuModel> {
    return this.http.get(this.endPoint + '/' + menuId)
      .toPromise()
      .then(response => response as CategoryModel)
      .catch(() => null);
  }


  newMenu(values: object): Promise<any> {
    return this.http.post(this.endPoint, values)
      .toPromise()
      .then(response => response)
      .catch(() => null);
  }

  updateMenu(values: object, categoryId: number): Promise<boolean> {
    return this.http.put(this.endPoint + '/' + categoryId, values)
      .toPromise()
      .then(() => true)
      .catch(() => false);
  }

  deleteMenu(menuId: number): Promise<boolean> {
    return this.http.delete(this.endPoint + '/' + menuId)
      .toPromise()
      .then(() => true)
      .catch(() => false);
  }
}

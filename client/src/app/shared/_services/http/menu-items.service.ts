import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseHttpService } from './base-http.service';

import { CategoryModel } from 'src/app/shared/_models/category.model';
import { MenuItemModel } from 'src/app/shared/_models/menu-item.model';


@Injectable()
export class MenuItemsService extends BaseHttpService {

  private readonly endPoint = this.apiUrl + '/menu-item';

  constructor(private http: HttpClient) {
    super();
  }

  getMenuItems(): Promise<MenuItemModel[]> {
    return this.http.get(this.endPoint )
      .toPromise()
      .then(response => response as MenuItemModel[])
      .catch(() => null);
  }


  updateMenuItems(values: object): Promise<any> {
    return this.http.post(this.endPoint + '/set', values)
      .toPromise()
      .then(response => response)
      .catch(() => null);
  }

}

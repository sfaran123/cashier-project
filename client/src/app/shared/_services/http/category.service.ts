import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SelectItem } from 'src/app/shared/_consts/select-item';

import { BaseHttpService } from './base-http.service';

import { DataTableResponse } from 'src/app/shared/_components/data-table/classes/data-table-response';
import { DataTableCriteria } from 'src/app/shared/_components/data-table/classes/data-table-criteria';
import { CategoryModel } from 'src/app/shared/_models/category.model';


@Injectable()
export class CategoryService extends BaseHttpService {

  private readonly endPoint = this.apiUrl + '/category';

  constructor(private http: HttpClient) {
    super();
  }

  getCategories(criteria: DataTableCriteria): Promise<DataTableResponse> {
    return this.http.post(this.apiUrl + '/categories', this.setDataTableParams(criteria))
      .toPromise()
      .then(response => response as DataTableResponse)
      .catch(() => null);
  }

  getCategory(categoryId: number): Promise<CategoryModel> {
    return this.http.get(this.endPoint + '/' + categoryId)
      .toPromise()
      .then(response => response as CategoryModel)
      .catch(() => null);
  }

  selectCategories(): Promise<SelectItem[]> {
    return this.http.get(this.endPoint + '/select')
      .toPromise()
      .then(response => response as SelectItem[])
      .catch(() => []);
  }

  newCategory(values: object): Promise<any> {
    return this.http.post(this.endPoint, values)
      .toPromise()
      .then(response => response)
      .catch(() => null);
  }

  updateCategory(values: object, categoryId: number): Promise<boolean> {
    return this.http.put(this.endPoint + '/' + categoryId, values)
      .toPromise()
      .then(() => true)
      .catch(() => false);
  }

  deleteCategory(categoryId: number): Promise<boolean> {
    return this.http.delete(this.endPoint + '/' + categoryId)
      .toPromise()
      .then(() => true)
      .catch(() => false);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseHttpService } from './base-http.service';

import { DataTableResponse } from 'src/app/shared/_components/data-table/classes/data-table-response';
import { DataTableCriteria } from 'src/app/shared/_components/data-table/classes/data-table-criteria';


import {EmployeeModel} from '../../_models/employee.model';

@Injectable()
export class EmployeeService extends BaseHttpService {

  private readonly endPoint = this.apiUrl + '/employee';

  constructor(private http: HttpClient) {
    super();
  }

  getEmployees(criteria: DataTableCriteria): Promise<DataTableResponse> {
    return this.http.post(this.endPoint + '/search', this.setDataTableParams(criteria))
      .toPromise()
      .then(response => response as DataTableResponse)
      .catch(() => null);
  }

  getEmployee(employeeId: number): Promise<EmployeeModel> {
    return this.http.get(this.endPoint + '/' + employeeId)
      .toPromise()
      .then(response => response as EmployeeModel)
      .catch(() => null);
  }

  newEmployee(values: object): Promise<any> {
    return this.http.post(this.endPoint, values)
      .toPromise()
      .then(response => response)
      .catch(() => null);
  }

  updateEmployee(values: object, employeeId: number): Promise<boolean> {
    return this.http.put(this.endPoint + '/' + employeeId, values)
      .toPromise()
      .then(() => true)
      .catch(() => false);
  }

  deleteEmployee(employeeId: number): Promise<boolean> {
    return this.http.delete(this.endPoint + '/' + employeeId)
      .toPromise()
      .then(() => true)
      .catch(() => false);
  }
}

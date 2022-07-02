import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { EmployeeService } from 'src/app/shared/_services/http/employee.service';

import { EmployeeModel } from 'src/app/shared/_models/employee.model';

@Injectable()
export class EmployeeResolve implements Resolve<EmployeeModel> {

  constructor(private employeeService: EmployeeService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.employeeService.getEmployee(route.params.id).then(response => response as EmployeeModel);
  }
}

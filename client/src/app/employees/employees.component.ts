import { Component, ViewChild } from '@angular/core';

import { DataTableComponent } from 'src/app/shared/_components/data-table/data-table.component';

import { EmployeeService } from 'src/app/shared/_services/http/employee.service';
import { NotificationService } from 'src/app/shared/_services/generic/notification.service';

import { EmployeeModel } from 'src/app/shared/_models/employee.model';

@Component({
  selector: 'app-table',
  templateUrl: './employees.component.html'

})
export class EmployeesComponent {

  @ViewChild(DataTableComponent, { static: true }) dataTable: DataTableComponent;

  readonly columns = [
    { name: 'name', label: 'NAME' },
    { name: 'magnetCard', label: 'MAGNETIC_CARD' },
    { name: 'phone', label: 'PHONE' },
    { name: 'isActive', label: 'STATUS' }
  ];

  constructor(private employeeService: EmployeeService, private notification: NotificationService) {}

  fetchItems(): void {
    this.employeeService.getEmployees(this.dataTable.criteria)
      .then((response) => this.dataTable.setItems(response));
  }

  deleteEmployee(employee: EmployeeModel): void {
    this.notification.warning('מחיקת עובד', employee.name + ' האם למחוק את העובד?').then((confirm) => {
      if (confirm.isConfirmed) {
      this.employeeService.deleteEmployee(employee.id)
        .then(() => this.fetchItems());
      }
    });
  }
}

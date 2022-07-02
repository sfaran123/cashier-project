import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { EmployeeService } from 'src/app/shared/_services/http/employee.service';
import { NotificationService } from 'src/app/shared/_services/generic/notification.service';

import { ErrorMessages } from 'src/app/shared/_consts/error-messages';
import { EmployeeModel } from 'src/app/shared/_models/employee.model';

import { EmployeeForm } from 'src/app/shared/_consts/forms/employee';

@Component({
  selector: 'app-new-employee',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  readonly errorMessages = ErrorMessages;

  employeeForm: FormGroup;

  employee: EmployeeModel;

  constructor(private fb: FormBuilder, private employeeService: EmployeeService,
              private router: Router, private route: ActivatedRoute,
              private notification: NotificationService) {}

  ngOnInit(): void {
    this.employeeForm = new EmployeeForm().form();
    this.employee = this.route.snapshot.data.employee;

    if (this.employee) {
      this.employeeForm.patchValue(this.employee);
    }
  }

  submit(): void {
    if (this.employeeForm.valid) {
      if (this.employee) {
        this.employeeService.updateEmployee(this.employeeForm.value, this.employee.id).then(response => this.handleResponse(response));
      } else {
        this.employeeService.newEmployee(this.employeeForm.value).then(response => this.handleResponse(response));
      }
    }
  }

  private handleResponse(response): void {
    if (response) {
      this.notification.success(this.employee ? 'עדכון עובד ' : 'עובד חדש',
        this.employee ? 'עדכנת הלקוח בהצלחה' : 'יצרת לקוח בהצלחה');
      this.router.navigate(['/employees']);
    }
  }
}

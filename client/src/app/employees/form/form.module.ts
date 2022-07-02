import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from 'src/app/shared/_pipes/translation/translate.module';

import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatRadioModule, MatSelectModule } from '@angular/material';

import { FormComponent } from 'src/app/employees/form/form.component';

import { EmployeeService } from '../../shared/_services/http/employee.service';

import { EmployeeResolve } from 'src/app/shared/_resolves/employee.resolve';

const routes: Routes = [
  { path: '', component: FormComponent },
  {
    path: ':id',
    component: FormComponent,
    resolve: { employee: EmployeeResolve }
  }
];

@NgModule({
  declarations: [FormComponent],
  imports: [
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule ,
    TranslateModule
  ],
  providers: [EmployeeService, EmployeeResolve]
})
export class FormModule {}

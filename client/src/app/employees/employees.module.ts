import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from 'src/app/shared/_pipes/translation/translate.module';

import { DataTableModule } from 'src/app/shared/_components/data-table/data-table.module';

import { EmployeesComponent } from 'src/app/employees/employees.component';

import { EmployeeService } from 'src/app/shared/_services/http/employee.service';

const routes: Routes = [
  { path: '', component: EmployeesComponent },
  { path: 'form', loadChildren: () => import('./form/form.module').then(m => m.FormModule) }
];

@NgModule({
  declarations: [EmployeesComponent],
  imports: [
    RouterModule.forChild(routes),
    DataTableModule,
    TranslateModule
  ],
  providers: [EmployeeService]
})
export class EmployeesModule {}

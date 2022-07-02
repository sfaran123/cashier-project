import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';

import { TranslateModule } from 'src/app/shared/_pipes/translation/translate.module';
import { BdSelectModule } from 'src/app/shared/_components/bd-select/bd-select.module';

import { CategoryService } from 'src/app/shared/_services/http/category.service';
import { SupplierService } from 'src/app/shared/_services/http/supplier.service';

import { FormComponent } from './form.component';

import { CategoriesResolve } from 'src/app/shared/_resolves/categories.resolve';
import { SupplierResolve } from 'src/app/shared/_resolves/supplier.resolve';

const routes: Routes = [
  {
    path: '',
    component: FormComponent,
    resolve: { categories: CategoriesResolve }
  },
  {
    path: ':id',
    component: FormComponent,
    resolve: { supplier: SupplierResolve, categories: CategoriesResolve }
  }
];

@NgModule({
  declarations: [FormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatCheckboxModule, MatButtonModule,
    BdSelectModule, MatSelectModule, TranslateModule
  ],
  providers: [SupplierService, CategoryService, CategoriesResolve, SupplierResolve]
})
export class FormModule {}

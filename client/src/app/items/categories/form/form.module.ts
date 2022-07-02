import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from 'src/app/shared/_pipes/translation/translate.module';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatTooltipModule
} from '@angular/material';

import { FormComponent } from 'src/app/items/categories/form/form.component';

import { CategoryService } from 'src/app/shared/_services/http/category.service';

import { CategoryResolve } from 'src/app/shared/_resolves/category.resolve';

const routes: Routes = [
  { path: '', component: FormComponent },
  {
    path: ':id',
    component: FormComponent,
    resolve: { category: CategoryResolve }
  }
];

@NgModule({
  declarations: [FormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MatFormFieldModule, MatInputModule,
    MatCheckboxModule, MatSelectModule,
    MatButtonModule, TranslateModule,
    MatTooltipModule
  ],
  providers: [CategoryService, CategoryResolve]
})
export class FormModule {}

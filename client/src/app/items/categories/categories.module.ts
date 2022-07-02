import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DataTableModule } from 'src/app/shared/_components/data-table/data-table.module';
import { MatDialog, MatDialogModule } from '@angular/material';
import { TranslateModule } from 'src/app/shared/_pipes/translation/translate.module';

import { CategoriesComponent } from 'src/app/items/categories/categories.component';

import { CategoryService } from 'src/app/shared/_services/http/category.service';

const routes: Routes = [
  { path: '', component: CategoriesComponent },
  { path: 'form', loadChildren: () => import('./form/form.module').then(m => m.FormModule) }
];

@NgModule({
  declarations: [CategoriesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DataTableModule,
    MatDialogModule,
    TranslateModule,
  ],

  providers: [CategoryService, MatDialog]
})
export class CategoriesModule {}

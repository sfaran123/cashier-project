import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TranslateModule } from 'src/app/shared/_pipes/translation/translate.module';
import { MatSelectModule } from '@angular/material/select';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule } from '@angular/material/dialog';
import { GroupsModule } from 'src/app/shared/_dialogs/groups/groups.module';
import { MatTooltipModule } from '@angular/material/tooltip';

import { FormComponent } from './form.component';
import { GroupsComponent } from 'src/app/shared/_dialogs/groups/groups.component';

import { CategoryService } from 'src/app/shared/_services/http/category.service';
import { SetService } from 'src/app/shared/_services/http/set.service';

import { GroupsResolve } from 'src/app/shared/_resolves/groups.resolve';
import { CategoriesResolve } from 'src/app/shared/_resolves/categories.resolve';
import { SetResolve } from 'src/app/shared/_resolves/set.resolve';

const routes: Routes = [
  {
    path: '',
    resolve: { groups: GroupsResolve, categories: CategoriesResolve },
    children: [
      {
      path: '',
      component: FormComponent
      },
      {
        path: ':id',
        component: FormComponent,
        resolve: { set: SetResolve }
      }
    ]
  }
];

@NgModule({
  declarations: [FormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    TranslateModule,
    MatSelectModule,
    DragDropModule,
    MatDialogModule,
    GroupsModule,
    MatTooltipModule
  ],
  entryComponents: [GroupsComponent],
  providers: [GroupsResolve, CategoriesResolve, CategoryService, SetService, SetResolve]
})
export class FormModule {}

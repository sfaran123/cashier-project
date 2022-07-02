import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from 'src/app/shared/_pipes/translation/translate.module';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatTooltipModule
} from '@angular/material';

import { FormComponent } from 'src/app/items/groups/form/form.component';

import { ItemService } from 'src/app/shared/_services/http/item.service';
import { GroupService } from 'src/app/shared/_services/http/group.service';

import { GroupResolve } from 'src/app/shared/_resolves/group.resolve';
import { ItemsSelectResolve } from 'src/app/shared/_resolves/items-select.resolve';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BdSelectModule } from 'src/app/shared/_components/bd-select/bd-select.module';

const routes: Routes = [
  { path: '', component: FormComponent, resolve: { selectItems: ItemsSelectResolve } },
  {
    path: ':id',
    component: FormComponent,
    resolve: { selectItems: ItemsSelectResolve, group: GroupResolve }
  },
];

@NgModule({
  declarations: [FormComponent],
  imports: [
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    TranslateModule,
    MatTooltipModule,
    DragDropModule,
    BdSelectModule
  ],
  providers: [ItemsSelectResolve, GroupResolve, ItemService, GroupService]
})
export class FormsModule {}

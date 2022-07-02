import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material';
import { DataTableModule } from 'src/app/shared/_components/data-table/data-table.module';
import { TranslateModule } from 'src/app/shared/_pipes/translation/translate.module';

import { GroupService } from 'src/app/shared/_services/http/group.service';

import { GroupsComponent } from 'src/app/items/groups/groups.component';

const routes: Routes = [
  { path: '', component: GroupsComponent },
  { path: 'form', loadChildren: () => import('src/app/items/groups/form/form.module').then(m => m.FormsModule) },
];

@NgModule({
  declarations: [GroupsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MatButtonModule, DataTableModule, TranslateModule
  ],
  providers: [GroupService]
})
export class GroupsModule {}

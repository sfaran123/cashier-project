import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DataTableModule } from 'src/app/shared/_components/data-table/data-table.module';
import { TranslateModule } from 'src/app/shared/_pipes/translation/translate.module';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

import { GroupsComponent } from './groups.component';
import { FormDialogComponent } from './form-dialog/form-dialog.component';

import { GroupService } from 'src/app/shared/_services/http/group.service';

const routes: Routes = [
  { path: '', component: GroupsComponent },
];

@NgModule({
  declarations: [GroupsComponent, FormDialogComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DataTableModule,
    TranslateModule,
    MatDialogModule
  ],
  providers: [
    GroupService,
    { provide: MAT_DIALOG_DATA, useValue: {} }
  ],
  entryComponents: [FormDialogComponent]
})
export class GroupsModule {}

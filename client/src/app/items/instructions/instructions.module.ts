import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from 'src/app/shared/_pipes/translation/translate.module';
import { DataTableModule } from 'src/app/shared/_components/data-table/data-table.module';
import { MatDialog, MatDialogModule } from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatTooltipModule } from '@angular/material/tooltip';

import { InstructionsComponent } from 'src/app/items/instructions/instructions.component';
import { FormDialogComponent } from './form-dialog/form-dialog.component';

import { InstructionsService } from 'src/app/shared/_services/http/instructions.service';

const routes: Routes = [
  {path: '', component: InstructionsComponent }
  ];

@NgModule({
  declarations: [InstructionsComponent, FormDialogComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DataTableModule,
    MatDialogModule,
    ReactiveFormsModule,
    TranslateModule,
    DragDropModule,
    MatTooltipModule
  ],
  entryComponents: [FormDialogComponent],
  providers: [MatDialog, InstructionsService]
})
export class InstructionsModule {}

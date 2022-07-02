import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

import { DataTableComponent } from './data-table.component';
import { PaginationComponent } from './pagination/pagination.component';
import { TranslateModule } from 'src/app/shared/_pipes/translation/translate.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatFormFieldModule, MatInputModule, MatSlideToggleModule, MatCheckboxModule, MatButtonModule, MatTooltipModule, TranslateModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule, MatInputModule, MatSlideToggleModule, MatCheckboxModule, MatButtonModule,
    RouterModule,
    PaginationComponent,
    DataTableComponent
  ],
  declarations: [DataTableComponent, PaginationComponent],
})
export class DataTableModule {
}

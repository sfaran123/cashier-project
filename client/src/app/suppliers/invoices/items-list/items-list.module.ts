import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from 'src/app/shared/_pipes/translation/translate.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { BdSelectModule } from 'src/app/shared/_components/bd-select/bd-select.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

import { ItemsListComponent } from 'src/app/suppliers/invoices/items-list/items-list.component';

import { ItemService } from 'src/app/shared/_services/http/item.service';

@NgModule({
  declarations: [ItemsListComponent],
  exports: [
      ItemsListComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    BdSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  providers: [ItemService]
})
export class ItemsListModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { ErrorsModule } from 'src/app/shared/_dialogs/errors/errors.module';

import { DataTableModule } from 'src/app/shared/_components/data-table/data-table.module';
import { TranslateModule } from 'src/app/shared/_pipes/translation/translate.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

import { ItemsComponent } from 'src/app/items/items.component';

import { ItemService } from 'src/app/shared/_services/http/item.service';
import { ImportService } from 'src/app/shared/_services/http/import.service';
import { LocaleService } from 'src/app/shared/_services/locale.service';

const routes: Routes = [
  { path: '', component: ItemsComponent }
];

@NgModule({
  declarations: [ItemsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DataTableModule,
    TranslateModule,
    MatTooltipModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    ErrorsModule
  ],
  providers: [ItemService, ImportService, LocaleService]
})
export class ItemsModule {}

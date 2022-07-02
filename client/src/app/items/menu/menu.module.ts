import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatSelectModule, MatTooltipModule } from '@angular/material';

import { DataTableModule } from 'src/app/shared/_components/data-table/data-table.module';
import { TranslateModule } from 'src/app/shared/_pipes/translation/translate.module';

import { MenuComponent } from 'src/app/items/menu/menu.component';

import { ItemService } from 'src/app/shared/_services/http/item.service';
import { MenuElementService } from 'src/app/shared/_services/http/menu-element.service';

import { ItemsSelectResolve } from 'src/app/shared/_resolves/items-select.resolve';

const routes: Routes = [
  { path: '', component: MenuComponent },
  { path: 'form', loadChildren: () =>  import('src/app/items/menu/form/form.module').then(m => m.FormModule) },
  { path: 'menu-items', loadChildren: () =>  import('src/app/items/menu/menu-items/menu-items.module')
      .then(m => m.MenuItemsModule) }

];

@NgModule({
  declarations: [MenuComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DataTableModule,
    TranslateModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatTooltipModule
  ],
  providers: [ItemService, FormBuilder, ItemsSelectResolve, MenuElementService]
})
export class MenuModule {}

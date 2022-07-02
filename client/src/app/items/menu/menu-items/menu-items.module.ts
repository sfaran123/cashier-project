import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from 'src/app/shared/_pipes/translation/translate.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatSelectModule, MatTooltipModule } from '@angular/material';
import { BdSelectModule } from 'src/app/shared/_components/bd-select/bd-select.module';
import { MatButtonModule } from '@angular/material/button';

import { MenuItemsComponent } from 'src/app/items/menu/menu-items/menu-items.component';

import { MenuElementService } from 'src/app/shared/_services/http/menu-element.service';

import { ItemsSelectResolve } from 'src/app/shared/_resolves/items-select.resolve';
import { MenuItemsResolve } from 'src/app/shared/_resolves/menu-items.resolve';

const routes: Routes = [
  {
    path: '', component: MenuItemsComponent,
    resolve: { selectItems: ItemsSelectResolve, menuItems: MenuItemsResolve }
  },
];

@NgModule({
  declarations: [MenuItemsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatTooltipModule,
    BdSelectModule,
    MatButtonModule,
    FormsModule
  ],
  providers: [ItemsSelectResolve, MenuElementService, MenuItemsResolve]
})
export class MenuItemsModule {}

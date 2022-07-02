import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { BdSelectModule } from 'src/app/shared/_components/bd-select/bd-select.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from 'src/app/shared/_pipes/translation/translate.module';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { InstructionsComponent } from './instructions/instructions.component';
import { ExtraItemsComponent } from './extra-items/extra-items.component';
import { FormComponent } from 'src/app/items/form/form.component';
import { SubItemsComponent } from './sub-items/sub-items.component';
import { CustomerPricesComponent } from './customer-prices/customer-prices.component';

import { InstructionsService } from 'src/app/shared/_services/http/instructions.service';
import { CategoryService } from 'src/app/shared/_services/http/category.service';
import { ClientService } from 'src/app/shared/_services/http/client.service';
import { SupplierService } from 'src/app/shared/_services/http/supplier.service';
import { ItemService } from 'src/app/shared/_services/http/item.service';

import { InstructionsResolve } from 'src/app/shared/_resolves/instructions.resolve';
import { ItemsSelectResolve } from 'src/app/shared/_resolves/items-select.resolve';
import { CategoriesResolve } from 'src/app/shared/_resolves/categories.resolve';
import { SuppliersResolve } from 'src/app/shared/_resolves/suppliers.resolve';
import { ClientsResolve } from 'src/app/shared/_resolves/clients.resolve';
import { ItemResolve } from 'src/app/shared/_resolves/item.resolve';

const routes: Routes = [
  {
    path: '',
    component: FormComponent,
    resolve: {
      categories: CategoriesResolve,
      instructions: InstructionsResolve,
      customers: ClientsResolve,
      suppliers: SuppliersResolve,
      itemsSelect: ItemsSelectResolve
    }
  },
  {
    path: ':id',
    component: FormComponent,
    resolve: {
      item: ItemResolve,
      instructions: InstructionsResolve,
      categories: CategoriesResolve,
      customers: ClientsResolve,
      suppliers: SuppliersResolve,
      itemsSelect: ItemsSelectResolve
    }
  }
];

@NgModule({
  declarations: [FormComponent, InstructionsComponent, ExtraItemsComponent, SubItemsComponent, CustomerPricesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatButtonModule,
    MatTooltipModule,
    TranslateModule,
    MatTabsModule,
    MatIconModule,
    BdSelectModule,
    DragDropModule,
    FormsModule
  ],
  providers: [
    ItemService,
    CategoryService,
    CategoriesResolve,
    ClientsResolve,
    ItemResolve,
    ClientService,
    SuppliersResolve,
    SupplierService,
    InstructionsResolve,
    InstructionsService,
    ItemsSelectResolve
  ]
})
export class FormModule {}

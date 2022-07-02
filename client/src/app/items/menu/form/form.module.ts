import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from 'src/app/shared/_pipes/translation/translate.module';

import { FormComponent } from 'src/app/items/menu/form/form.component';

import { MenuElementService } from 'src/app/shared/_services/http/menu-element.service';
import { ItemService } from 'src/app/shared/_services/http/item.service';

import { ItemsSelectResolve } from 'src/app/shared/_resolves/items-select.resolve';
import { MenuElementResolve } from 'src/app/shared/_resolves/menu-element.resolve';

const routes: Routes = [
  {
    path: '',
    component: FormComponent,
    resolve: {
      selectItems: ItemsSelectResolve
    }
  },
  {
    path: ':id',
    component: FormComponent,
    resolve: { selectItems: ItemsSelectResolve, menu: MenuElementResolve }
  }
];

@NgModule({
  declarations: [FormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatTooltipModule, TranslateModule
  ],
  providers: [ItemsSelectResolve, MenuElementResolve, MenuElementService, ItemService]
})
export class FormModule {}

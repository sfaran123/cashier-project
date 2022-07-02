import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { DataTableModule } from 'src/app/shared/_components/data-table/data-table.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from 'src/app/shared/_pipes/translation/translate.module';

import { SetsComponent } from 'src/app/items/sets/sets.component';

import { SetService } from 'src/app/shared/_services/http/set.service';

const routes: Routes = [
  { path: '', component: SetsComponent },
  { path: 'form', loadChildren: () => import('./form/form.module').then(m => m.FormModule) }
];

@NgModule({
  declarations: [SetsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    DataTableModule,
    MatTooltipModule,
    TranslateModule
  ],
  providers: [SetService]
})
export class SetsModule {}

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';

import { DataTableModule } from 'src/app/shared/_components/data-table/data-table.module';

import { ClubTableComponent } from 'src/app/clients/club-members/club-table.component';

import { ClubCustomerService } from 'src/app/shared/_services/http/club-customer.service';

const routes: Routes = [
  { path: '' , component: ClubTableComponent },
];

@NgModule({
  declarations: [ClubTableComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    DataTableModule,
  ],
  providers: [ClubCustomerService]
})
export class ClubTableModule {}

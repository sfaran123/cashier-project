import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from 'src/app/shared/_pipes/translation/translate.module';
import { DataTableModule } from 'src/app/shared/_components/data-table/data-table.module';

import { ClientsComponent } from 'src/app/clients/clients.component';

import { ClientService } from 'src/app/shared/_services/http/client.service';

const routes: Routes = [
  { path: '', component: ClientsComponent },
  { path: 'form', loadChildren: () => import('./form/form.module').then(m => m.FormModule) },
  { path: 'groups', loadChildren: () => import('./groups/groups.module').then(m => m.GroupsModule) },
  { path: 'shipping-certificates', loadChildren: () => import('./documents/documents.module').then(m => m.DocumentsModule) },
  { path: 'offer-prices', loadChildren: () => import('./documents/documents.module').then(m => m.DocumentsModule) },
  { path: 'central-invoices', loadChildren: () => import('./central-invoices/central-invoices.module').then(m => m.CentralInvoicesModule) },
  { path: 'central-invoices-issuing', loadChildren: () => import('./central-invoices-issuing/central-invoices-issuing.module').then(m => m.CentralInvoicesIssuingModule) }
];

@NgModule({
  declarations: [ClientsComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    DataTableModule,
    TranslateModule
  ],
  providers: [ClientService]
})
export class ClientsModule {}

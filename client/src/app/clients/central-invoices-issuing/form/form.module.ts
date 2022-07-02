import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateModule } from 'src/app/shared/_pipes/translation/translate.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

import { FormComponent } from './form.component';

import { ClientService } from 'src/app/shared/_services/http/client.service';
import { CentralInvoiceService } from 'src/app/shared/_services/http/central-invoice.service';

import { ClientResolve } from 'src/app/shared/_resolves/client.resolve';


const routes: Routes = [
  { path: '', component: FormComponent },
  { path: ':id', component: FormComponent, resolve: { client: ClientResolve } },
];

@NgModule({
  declarations: [FormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatFormFieldModule,
    TranslateModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCheckboxModule,
    FormsModule,
    MatButtonModule
  ],
  providers: [ClientResolve, ClientService, CentralInvoiceService]
})
export class FormModule {}

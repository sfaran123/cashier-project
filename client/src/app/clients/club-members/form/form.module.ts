import {NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule} from '@angular/common';
import { MatButtonModule, MatCheckboxModule, MatInputModule } from '@angular/material';
import { TranslateModule } from 'src/app/shared/_pipes/translation/translate.module';

import { FormComponent } from 'src/app/clients/club-members/form/form.component';

import { ClubCustomerService } from 'src/app/shared/_services/http/club-customer.service';

const routes: Routes = [
  { path: '' , component: FormComponent },
];

@NgModule({
  declarations: [FormComponent],
  imports: [
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    TranslateModule
  ],
  providers: [ClubCustomerService]
})
export class FormModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyFormComponent } from 'src/app/settings/company-form/company-form.component';
import {MatCheckboxModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '../../shared/_pipes/translation/translate.module';
import {CompanyService} from '../../shared/_services/http/company.service';
import {CommonModule} from '@angular/common';

const routes: Routes = [
  {path: '', component: CompanyFormComponent}
];

@NgModule({
  declarations: [CompanyFormComponent],
  imports: [
    RouterModule.forChild(routes),
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    FormsModule,
    TranslateModule,
    MatOptionModule,
    MatSelectModule,
    CommonModule
  ],
  providers: [CompanyService]
})
export class CompanyFormModule {}

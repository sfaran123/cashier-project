import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MatCheckboxModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '../../shared/_pipes/translation/translate.module';
import {CommonModule} from '@angular/common';
import {StoreFormComponent} from './store-form.component';
import {StoreService} from '../../shared/_services/http/store.service';
import {StoreResolve} from '../../shared/_resolves/store.resolve';

const routes: Routes = [
  {path: '', component: StoreFormComponent},
  {path: ':id', component: StoreFormComponent, resolve: { store: StoreResolve}}
];

@NgModule({
  declarations: [StoreFormComponent],
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
  providers: [StoreService, StoreResolve]
})
export class StoreFormModule {}

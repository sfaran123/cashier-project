import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MatCheckboxModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '../../shared/_pipes/translation/translate.module';
import {CommonModule} from '@angular/common';
import {PosFormComponent} from './pos-form.component';
import {PosResolve} from '../../shared/_resolves/pos.resolve';
import {PosService} from '../../shared/_services/http/pos.service';

const routes: Routes = [
  {path: '', component: PosFormComponent},
  {path: ':id', component: PosFormComponent, resolve: { pos: PosResolve}}
];

@NgModule({
  declarations: [PosFormComponent],
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
    CommonModule, ],
  providers: [PosService, PosResolve]
})
export class PosFormModule {}

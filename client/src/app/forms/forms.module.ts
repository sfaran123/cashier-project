import {NgModule} from '@angular/core';

import {RouterModule, Routes} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {FormsComponent} from './forms.component';

const routes: Routes = [
  {path: '' , component: FormsComponent},
];

@NgModule({
  declarations: [FormsComponent],
  imports: [
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    CommonModule
  ]
})
export class FormsModule {}

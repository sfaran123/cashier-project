import {NgModule} from '@angular/core';

import {RouterModule, Routes} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import {InterfacesComponent} from './interfaces.component';

const routes: Routes = [
  {path: '' , component: InterfacesComponent},
];

@NgModule({
  declarations: [InterfacesComponent],
  imports: [
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    CommonModule
  ]
})
export class InterfacesModule {}

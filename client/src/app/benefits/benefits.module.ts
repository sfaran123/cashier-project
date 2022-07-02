import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {BenefitsComponent} from './benefits.component';

const routes: Routes = [
  {path: '' , component: BenefitsComponent},
];

@NgModule({
  declarations: [BenefitsComponent],
  imports: [
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    CommonModule
  ]
})
export class BenefitsModule {}

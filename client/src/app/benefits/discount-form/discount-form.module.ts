import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import { DiscountFormComponent } from 'src/app/benefits/discount-form/discount-form.component';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';
import { DiscountService } from 'src/app/shared/_services/http/discount.service';


const routes: Routes = [
  {path: '' , component: DiscountFormComponent},
];

@NgModule({
  declarations: [DiscountFormComponent],
  imports: [
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule
  ],
  providers: [DiscountService]
})
export class DiscountFormModule {}

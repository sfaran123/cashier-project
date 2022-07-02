import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';

import { CampaignFormComponent } from 'src/app/benefits/campaign-form/campaign-form.component';
import { FixedDiscountPriceComponent } from './campaign-types/fixed-discount-price/fixed-discount-price.component';
import { DiscountItemNumberYComponent } from './campaign-types/discount-item-number-y/discount-item-number-y.component';
import { DiscountOnCheapestItemComponent } from './campaign-types/discount-on-cheapest-item/discount-on-cheapest-item.component';
import { GeneralDiscountComponent } from './campaign-types/general-discount/general-discount.component';
import { DiscountByWeightComponent } from './campaign-types/discount-by-weight/discount-by-weight.component';

import { CampaignService } from 'src/app/shared/_services/http/campaign.service';


const routes: Routes = [
  {path: '' , component: CampaignFormComponent},
];

@NgModule({
  declarations: [
    CampaignFormComponent,
    FixedDiscountPriceComponent,
    DiscountItemNumberYComponent,
    DiscountOnCheapestItemComponent,
    GeneralDiscountComponent,
    DiscountByWeightComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule
  ],
  providers: [CampaignService]
})
export class CampaignFormModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'discount-form',
    loadChildren: () => import('src/app/benefits/discount-form/discount-form.module').then(m => m.DiscountFormModule)
  },
  {
    path: 'campaign-form',
    loadChildren: () => import('src/app/benefits/campaign-form/campaign-form.module').then(m => m.CampaignFormModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class CustomersRoutingModule {
}

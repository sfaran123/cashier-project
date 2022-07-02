import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {InventoryComponent} from './inventory.component';

const routes: Routes = [
  {path: '' , component: InventoryComponent},
];

@NgModule({
  declarations: [InventoryComponent],
  imports: [
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    CommonModule
  ]
})
export class InventoryModule {}

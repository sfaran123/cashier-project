import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { DataTableModule } from 'src/app/shared/_components/data-table/data-table.module';

import { TranslateModule } from 'src/app/shared/_pipes/translation/translate.module';
import { NotificationService } from 'src/app/shared/_services/generic/notification.service';
import {MatStepperModule, MatTooltipModule} from '@angular/material';
import { MatStepper } from '@angular/material/stepper';

import {StepperComponent} from './stepper.component';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';

const routes: Routes = [
  { path: '', component: StepperComponent },
];

@NgModule({
  declarations: [StepperComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    DataTableModule,
    TranslateModule,
    MatTooltipModule,
    MatStepperModule,
    ReactiveFormsModule,
  ],
  providers: [NotificationService, FormBuilder, MatStepper]
})
export class StepperModule {
}

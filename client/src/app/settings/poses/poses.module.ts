import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { DataTableModule } from 'src/app/shared/_components/data-table/data-table.module';

import { TranslateModule } from 'src/app/shared/_pipes/translation/translate.module';
import { NotificationService } from 'src/app/shared/_services/generic/notification.service';
import { MatTooltipModule } from '@angular/material';
import {PosesComponent} from './poses.component';
import {PosService} from '../../shared/_services/http/pos.service';

const routes: Routes = [
  { path: '', component: PosesComponent },
];

@NgModule({
  declarations: [PosesComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    DataTableModule,
    TranslateModule,
    MatTooltipModule,
  ],
  providers: [PosService, NotificationService]
})
export class PosesModule {
}

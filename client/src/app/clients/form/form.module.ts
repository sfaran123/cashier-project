import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from 'src/app/shared/_pipes/translation/translate.module';
import { MatButtonModule, MatCheckboxModule, MatInputModule, MatSelectModule } from '@angular/material';
import { BdSelectModule } from 'src/app/shared/_components/bd-select/bd-select.module';

import { FormComponent } from './form.component';

import { ClientService } from 'src/app/shared/_services/http/client.service';
import { GroupService } from 'src/app/shared/_services/http/group.service';

import { ClientResolve } from 'src/app/shared/_resolves/client.resolve';
import { ClientParentResolve } from 'src/app/shared/_resolves/client-parent.resolve';
import { GroupsSelectResolve } from 'src/app/shared/_resolves/groups-select.resolve';

const routes: Routes = [
  {
    path: '',
    resolve: {
      parents: ClientParentResolve,
      groups: GroupsSelectResolve
    },
    children: [
      {
        path: '',
        component: FormComponent,

      },
      {
        path: ':id',
        component: FormComponent,
        resolve: { client: ClientResolve }
      },
    ]
  },
];

@NgModule({
  declarations: [FormComponent],
  imports: [
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatSelectModule,
    TranslateModule,
    BdSelectModule
  ],
  providers: [
    ClientService,
    ClientResolve,
    ClientParentResolve,
    GroupService,
    GroupsSelectResolve
  ]
})
export class FormModule {}

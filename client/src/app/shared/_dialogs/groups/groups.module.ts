import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TranslateModule } from 'src/app/shared/_pipes/translation/translate.module';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { GroupsComponent } from './groups.component';

import { GroupService } from 'src/app/shared/_services/http/group.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [GroupsComponent],
  imports: [
    CommonModule,
    MatCheckboxModule,
    TranslateModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  providers: [GroupService]
})
export class GroupsModule {}

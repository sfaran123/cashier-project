import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from 'src/app/shared/_pipes/translation/translate.module';

import { ErrorsComponent } from './errors.component';

@NgModule({
  declarations: [ErrorsComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    TranslateModule
  ],
  entryComponents: [ErrorsComponent]
})
export class ErrorsModule { }

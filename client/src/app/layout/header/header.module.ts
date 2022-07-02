import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatMenuModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from 'src/app/shared/_pipes/translation/translate.module';

import { HeaderComponent } from './header.component';

import { LocaleService } from 'src/app/shared/_services/locale.service';
import { TranslationService } from 'src/app/shared/_services/http/translation.service';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatMenuModule,
    MatButtonModule,
    BrowserAnimationsModule,
    TranslateModule
  ],
  exports: [HeaderComponent],
  providers: [LocaleService, TranslationService]
})
export class HeaderModule {}

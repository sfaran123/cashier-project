import { Pipe, PipeTransform } from '@angular/core';

import { LocaleService } from 'src/app/shared/_services/locale.service';

import { TranslationModel } from 'src/app/shared/_models/translation.model';

@Pipe({
  name: 't',
  pure: false,
})
export class TranslatePipe implements PipeTransform {
  private translations: TranslationModel[] = [];

  constructor(protected localeService: LocaleService) {
    this.translations = this.localeService.getTranslations();
    this.localeService.langChanged.subscribe(() => this.translations = this.localeService.getTranslations());
  }

  transform(key: string) {
    return this.translations[key] || key;
  }
}

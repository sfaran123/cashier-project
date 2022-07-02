import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { TranslationService } from './http/translation.service';

import { TranslationModel } from 'src/app/shared/_models/translation.model';

@Injectable()
export class LocaleService {

  constructor(private translationService: TranslationService) {}

  lang: string;
  langChanged: Subject<string> = new Subject;

  initLang(): string {
    const lang = localStorage.getItem('lang');
    if (lang) {
      this.lang = lang;
      return lang;
    }

    return 'he';
  }

  getLang(): string {
    return localStorage.getItem('lang');
  }

  setLang(lang: string): void {
    this.lang = lang;
    this.translationService.getTranslations(lang)
      .then(response => {
        this.setTranslations(response);
        localStorage.setItem('lang', lang);
        this.langChanged.next(lang);
      });
  }

  getTranslations(): any {
    if (localStorage.getItem('translations')) {
      return JSON.parse(localStorage.getItem('translations'));
    }

    return false;
  }

  setTranslations(translations: TranslationModel[]): any {
    localStorage.setItem('translations', JSON.stringify(translations));
  }
}

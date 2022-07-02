import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseHttpService } from './base-http.service';

import { TranslationModel } from 'src/app/shared/_models/translation.model';

@Injectable()
export class TranslationService extends BaseHttpService {

  readonly endPoint = this.apiUrl + '/translation';

  constructor(private http: HttpClient) {
    super();
  }

  getTranslations(lang: string): Promise<TranslationModel[]> {
    return this.http.get(this.endPoint + '?lang=' + lang).toPromise()
      .then(response => response as TranslationModel[]);
  }
}

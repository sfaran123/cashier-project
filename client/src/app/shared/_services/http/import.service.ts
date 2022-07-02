import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseHttpService } from 'src/app/shared/_services/http/base-http.service';

@Injectable()
export class ImportService extends BaseHttpService {

  readonly endPoint = this.apiUrl + '/excel';

  constructor(private http: HttpClient) {
    super();
  }

  uploadFile(file: File): Promise<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(this.endPoint + '/import', formData)
      .toPromise()
      .then(response => response)
      .catch(() => null);
  }

  getExampleFile(type: string, lang: string): Promise<Blob> {
    return this.http.get(this.endPoint + '/example', this.getBlobRequest({ type, lang }))
      .toPromise()
      .then(response => response as Blob)
      .catch(() => null);
  }
}

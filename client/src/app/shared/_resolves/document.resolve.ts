import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { DocumentService } from 'src/app/shared/_services/http/document.service';

@Injectable()
export class DocumentResolve implements Resolve<any> {

  constructor(private documentService: DocumentService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.documentService.getDocument(route.params.id).then(response => response);
  }
}

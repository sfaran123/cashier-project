import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';


import { CentralInvoiceModel } from 'src/app/shared/_models/central-invoice.model';
import { CentralInvoiceService } from 'src/app/shared/_services/http/central-invoice.service';

@Injectable()
export class CentralInvoiceResolve implements Resolve<CentralInvoiceModel> {

  constructor(private centralInvoiceService: CentralInvoiceService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.centralInvoiceService.getInvoice(route.params.id).then(response => response as CentralInvoiceModel);
  }
}

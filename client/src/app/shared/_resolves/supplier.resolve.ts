import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { SupplierService } from 'src/app/shared/_services/http/supplier.service';

import { SupplierModel } from 'src/app/shared/_models/supplier.model';

@Injectable()
export class SupplierResolve implements Resolve<SupplierModel> {

  constructor(private supplierService: SupplierService) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.supplierService.getSupplier(route.params.id).then(response => response as SupplierModel);
  }
}

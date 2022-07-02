import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { SupplierService } from 'src/app/shared/_services/http/supplier.service';

import { SelectItem } from 'src/app/shared/_consts/select-item';

@Injectable()
export class SuppliersResolve implements Resolve<SelectItem[]> {

  constructor(private supplierService: SupplierService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.supplierService.selectSupplier().then(response => response as SelectItem[]);
  }
}

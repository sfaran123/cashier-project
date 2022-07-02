import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { SupplierService } from 'src/app/shared/_services/http/supplier.service';

import { SupplierModel } from 'src/app/shared/_models/supplier.model';
import {StoreModel} from '../_models/store.model';
import {StoreService} from '../_services/http/store.service';

@Injectable()
export class StoreResolve implements Resolve<StoreModel> {

  constructor(private storeService: StoreService) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.storeService.getStore(route.params.id).then(response => response as StoreModel);
  }
}

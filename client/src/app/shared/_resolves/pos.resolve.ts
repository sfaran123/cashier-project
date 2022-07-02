import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { SupplierService } from 'src/app/shared/_services/http/supplier.service';

import { SupplierModel } from 'src/app/shared/_models/supplier.model';
import {StoreModel} from '../_models/store.model';
import {StoreService} from '../_services/http/store.service';
import {PosModel} from '../_models/pos.model';
import {PosService} from '../_services/http/pos.service';

@Injectable()
export class PosResolve implements Resolve<PosModel> {

  constructor(private posService: PosService) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.posService.getPos(route.params.id).then(response => response as PosModel);
  }
}

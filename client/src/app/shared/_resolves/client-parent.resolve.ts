import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { ClientService } from 'src/app/shared/_services/http/client.service';

import { SelectItem } from 'src/app/shared/_consts/select-item';

@Injectable()
export class ClientParentResolve implements Resolve<SelectItem[]> {

  constructor(private clientsService: ClientService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.clientsService.getParents(route.params.id).then(response => response as SelectItem[]);
  }
}

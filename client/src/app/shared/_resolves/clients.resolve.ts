import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { ClientService } from 'src/app/shared/_services/http/client.service';

import { SelectItem } from 'src/app/shared/_consts/select-item';

@Injectable()
export class ClientsResolve implements Resolve<SelectItem[]> {

  constructor(private clientsService: ClientService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.clientsService.selectClient().then(response => response as SelectItem[]);
  }
}

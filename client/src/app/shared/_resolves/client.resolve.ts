import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { ClientService } from 'src/app/shared/_services/http/client.service';

import { ClientModel } from 'src/app/shared/_models/client.model';

@Injectable()
export class ClientResolve implements Resolve<ClientModel> {

  constructor(private clientsService: ClientService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.clientsService.getClient(route.params.id).then(response => response as ClientModel);
  }
}

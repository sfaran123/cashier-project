import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { SetService } from 'src/app/shared/_services/http/set.service';

import { SetModel } from 'src/app/shared/_models/set.model';

@Injectable()
export class SetResolve implements Resolve<SetModel> {

  constructor(private setService: SetService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.setService.getSet(route.params.id).then(response => response as SetModel);
  }
}

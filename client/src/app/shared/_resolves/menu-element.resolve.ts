import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { MenuElementService } from 'src/app/shared/_services/http/menu-element.service';

import { MenuElementModel } from 'src/app/shared/_models/menu-element.model';

@Injectable()
export class MenuElementResolve implements Resolve<MenuElementModel> {

  constructor(private menuElementService: MenuElementService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.menuElementService.getMenuElement(route.params.id).then(response => response as MenuElementModel);
  }
}

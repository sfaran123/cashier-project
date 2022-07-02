import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { MenuElementService } from 'src/app/shared/_services/http/menu-element.service';

import { MenuItemModel } from 'src/app/shared/_models/menu-item.model';

@Injectable()
export class MenuItemsResolve implements Resolve<MenuItemModel> {

  constructor( private menuElementService: MenuElementService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.menuElementService.getMainMenuItems().then(response => response as MenuItemModel);
  }
}

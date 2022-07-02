import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { CategoryService } from 'src/app/shared/_services/http/category.service';

import { CategoryModel } from 'src/app/shared/_models/category.model';
import { MenuService } from 'src/app/shared/_services/http/menu.service';
import { MenuModel } from 'src/app/shared/_models/menu.model';

@Injectable()
export class MenuResolve implements Resolve<MenuModel> {

  constructor(private menuService: MenuService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.menuService.getMenu(route.params['{id}'])
      .then(response => response as MenuModel);
  }
}

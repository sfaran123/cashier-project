import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { MenuElementService } from 'src/app/shared/_services/http/menu-element.service';

import { DataTableCriteria } from 'src/app/shared/_components/data-table/classes/data-table-criteria';
import { DataTableResponse } from 'src/app/shared/_components/data-table/classes/data-table-response';


@Injectable()
export class MenuElementsResolve implements Resolve<DataTableResponse> {

  constructor( private menuElementService: MenuElementService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const criteria = new DataTableCriteria();
    const type = state.url.split('/')[3] === 'menu-items' ? 'item' : 'folder';
    return this.menuElementService.getMenuElements(criteria, null, type).then(response => response as DataTableResponse);
  }
}

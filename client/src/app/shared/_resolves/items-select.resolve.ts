import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { ItemService } from 'src/app/shared/_services/http/item.service';

import { SelectItem } from 'src/app/shared/_consts/select-item';


@Injectable()
export class ItemsSelectResolve implements Resolve<SelectItem[]> {

  constructor(private itemService: ItemService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.itemService.selectItems()
      .then(response => response as SelectItem[]);
  }
}

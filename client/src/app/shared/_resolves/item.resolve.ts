import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { ItemService } from 'src/app/shared/_services/http/item.service';
import { ItemModel } from 'src/app/shared/_models/item.model';

@Injectable()
export class ItemResolve implements Resolve<ItemModel> {

  constructor(private itemsService: ItemService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.itemsService.getItem(route.params.id).then(response => response as ItemModel);
  }
}

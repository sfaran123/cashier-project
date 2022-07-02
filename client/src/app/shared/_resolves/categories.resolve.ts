import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { CategoryService } from 'src/app/shared/_services/http/category.service';

import { SelectItem } from 'src/app/shared/_consts/select-item';

@Injectable()
export class CategoriesResolve implements Resolve<SelectItem[]> {

  constructor(private categoryService: CategoryService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.categoryService.selectCategories().then(response => response as SelectItem[]);
  }
}

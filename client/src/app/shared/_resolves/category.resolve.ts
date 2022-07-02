import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { CategoryService } from 'src/app/shared/_services/http/category.service';

import { CategoryModel } from 'src/app/shared/_models/category.model';

@Injectable()
export class CategoryResolve implements Resolve<CategoryModel> {

  constructor(private categoryService: CategoryService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.categoryService.getCategory(route.params.id)
      .then(response => response as CategoryModel);
  }
}

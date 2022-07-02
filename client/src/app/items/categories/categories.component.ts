import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { DataTableComponent } from 'src/app/shared/_components/data-table/data-table.component';

import { CategoryService } from 'src/app/shared/_services/http/category.service';

import { Trash, PencilPaper } from 'src/app/shared/_consts/img-paths';

@Component({
  selector: 'app-category-table',
  templateUrl: './categories.component.html',
})
export class CategoriesComponent {

  @ViewChild(DataTableComponent, { static: true }) dataTable: DataTableComponent;

  trash = Trash;
  pencil = PencilPaper;

  readonly columns = [
    { name: 'name', label: 'CATEGORY_NAME' },
    { name: 'categoryNumber', label: 'CATEGORY_NUMBER' }
  ];

  constructor(private categoryService: CategoryService, private router: Router) {}

  fetchItems(): void {
    this.categoryService.getCategories(this.dataTable.criteria)
      .then(response => this.dataTable.setItems(response));
  }

  delete(id: number): void {
    this.categoryService.deleteCategory(id).then(() => this.fetchItems());
  }
}

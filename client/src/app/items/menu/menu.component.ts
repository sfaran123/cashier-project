import { Component, ViewChild } from '@angular/core';

import { MenuElementService } from 'src/app/shared/_services/http/menu-element.service';

import { DataTableComponent } from 'src/app/shared/_components/data-table/data-table.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent {

  readonly columns = [
    { name: 'name', label: 'NAME' },
    { name: 'serialNumber', label: 'SERIAL_NUMBER' },
    { name: 'color', label: 'COLOR' }
  ];

  constructor(private menuElementService: MenuElementService) {}

  @ViewChild(DataTableComponent, {static: true}) dataTable: DataTableComponent;

  fetchItems(): void {
    this.menuElementService.getMenuElements(this.dataTable.criteria, null).then(response => this.dataTable.setItems(response));
  }

  deleteMenu(id: number): void {
    this.menuElementService.deleteMenuElement(id).then(() => this.fetchItems());
  }
}

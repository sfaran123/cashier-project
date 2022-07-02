import { Component, ViewChild } from '@angular/core';

import { GroupService } from 'src/app/shared/_services/http/group.service';

import { DataTableComponent } from 'src/app/shared/_components/data-table/data-table.component';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html'
})
export class GroupsComponent {

  @ViewChild(DataTableComponent, {static: true}) dataTable: DataTableComponent;

  readonly columns = [
    { name: 'number', label: 'NUMBER' },
    { name: 'name', label: 'NAME' },
    { name: 'itemsCount', label: 'NUMBER_OF_ITEMS_IN_THE_GROUP' },
    { name: 'extraItemsCount', label: 'AMOUNT_OF_ITEMS_THAT_ARE_EXTRA' },
  ];
  constructor(private itemGroupsService: GroupService) { }

  fetchItems() {
    this.itemGroupsService.getGroups('items', this.dataTable.criteria)
      .then(response => this.dataTable.setItems(response));
  }

  deleteGroup(groupId: number): void {
    this.itemGroupsService.deleteGroup(groupId).then(() => this.fetchItems());
  }
}

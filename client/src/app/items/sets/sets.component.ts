import { Component, ViewChild } from '@angular/core';

import { DataTableComponent } from 'src/app/shared/_components/data-table/data-table.component';

import { SetService } from 'src/app/shared/_services/http/set.service';
import { NotificationService } from 'src/app/shared/_services/generic/notification.service';

@Component({
  selector: 'app-combinations',
  templateUrl: './sets.component.html'
})
export class SetsComponent {

  @ViewChild(DataTableComponent, { static: true }) dataTable: DataTableComponent;

  readonly columns = [
    { name: 'code', label: 'CODE' }, { name: 'name', label: 'NAME' },
    { name: 'category', label: 'MAIN_CATEGORY' }, { name: 'subCategory', label: 'SUB_CATEGORY' },
    { name: 'price', label: 'PRICE' }, { name: 'groupsCount', label: 'GROUPS_COUNT' }
  ];

  constructor(private setService: SetService, private notification: NotificationService) {}

  fetchItems() {
    this.setService.getSets(this.dataTable.criteria).then(response => this.dataTable.setItems(response));
  }

  deleteItem(setId: number): void {
    this.notification.warning('האם ברצונך למחוק את החבילה?').then(res => {
      if (res.value) {
        this.setService.deleteSet(setId).then(() => {
          this.notification.success();
          this.fetchItems();
        });
      }
    });
  }
}

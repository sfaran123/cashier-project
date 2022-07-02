import { Component, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { DataTableComponent } from 'src/app/shared/_components/data-table/data-table.component';
import { ErrorsComponent } from 'src/app/shared/_dialogs/errors/errors.component';

import { ItemService } from 'src/app/shared/_services/http/item.service';
import { ImportService } from 'src/app/shared/_services/http/import.service';
import { NotificationService } from 'src/app/shared/_services/generic/notification.service';
import { LocaleService } from 'src/app/shared/_services/locale.service';

import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html'
})
export class ItemsComponent implements OnDestroy {

  @ViewChild(DataTableComponent, { static: true }) dataTable: DataTableComponent;

  readonly columns = [
    { name: 'code', label: 'ITEM_CODE' }, { name: 'description', label: 'ITEM_DESCRIPTION' },
    { name: 'supplier', label: 'SUPPLIER' }, { name: 'category', label: 'MAIN_CATEGORY' },
    { name: 'subCategory', label: 'SUB_CATEGORY' },
    { name: 'costPrice', label: 'COST_PRICE' },
    { name: 'costPrice', label: 'COST_PRICE' },
    { name: 'customerPrice', label: 'CUSTOMER_PRICE' },
    { name: 'profitabilityPercentage', label: 'PROFITABILITY_PERCENTAGE' },
    { name: 'inventoryBalance', label: 'INVENTORY_BALANCE' }
  ];

  // todo get from somewhere
  readonly VAT_PERCENTAGES = 0.17;

  sub = new Subscription();

  constructor(private itemService: ItemService, private importService: ImportService,
              private notification: NotificationService, private langService: LocaleService,
              private dialog: MatDialog) {}

  fetchItems() {
    this.itemService.getItems(this.dataTable.criteria).then(response => this.dataTable.setItems(response));
  }

  calculateVat(item: any, withVat: boolean): number {
    if (item.includesVat && withVat || !item.includesVat && !withVat) {
        return item.costPrice;
    }

    if (!item.includesVat && withVat) {
      return item.costPrice + (item.costPrice * this.VAT_PERCENTAGES);
    }

    return item.costPrice - (item.costPrice * this.VAT_PERCENTAGES);
  }

  upload(file: File): void {
    this.importService.uploadFile(file).then(response => {
      if (response && response.errors) {
        this.openErrorsDialog(response.errors);
      } else {
        if (response) {
          this.notification.success( 'לקוחות יובאו בהצלחה');
          this.fetchItems();
        }
      }
    });
  }

  openErrorsDialog(errors: any[]): void {
    const dialog = this.dialog.open(ErrorsComponent, {
      data: errors,
      width: '500px'
    });

    this.sub.add(dialog.afterClosed().subscribe(() => this.fetchItems()));
  }

  downloadExampleFile(): void {
    this.importService.getExampleFile('items', this.langService.getLang()).then(response => {
      FileSaver.saveAs(response, 'דוגמא.xlsx');
    });
  }

  profitPercentage(item: any): number {
    const costPrice = this.calculateVat(item, true);
    const diff = item.customerPrice - costPrice;
    return diff * 100 / costPrice;
  }

  deleteItem(itemId: number): void {
    this.itemService.deleteItem(itemId).then(() => this.fetchItems());
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}

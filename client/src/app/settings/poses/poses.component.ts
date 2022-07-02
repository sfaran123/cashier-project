import { Component, OnInit, ViewChild } from '@angular/core';
import { PencilPaper, Trash } from 'src/app/shared/_consts/img-paths';
import { DataTableComponent } from 'src/app/shared/_components/data-table/data-table.component';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/_services/generic/notification.service';
import {StoreService} from '../../shared/_services/http/store.service';
import {PosService} from '../../shared/_services/http/pos.service';

@Component({
  selector: 'app-table',
  templateUrl: './poses.component.html'

})
export class PosesComponent {

  @ViewChild(DataTableComponent, { static: true }) dataTable: DataTableComponent;


  trash = Trash;
  pencil = PencilPaper;

  readonly columns = [
    { name: 'id', label: 'code' },
    { name: 'name', label: 'POS_NAME' },
    { name: 'internalNumber', label: 'POS_NUMBER' },
    { name: 'decimalCircle', label: 'DECIMAL_CIRCLE' },
    { name: 'maxSaleAmount', label: 'MAX_SALE_AMOUNT' },
    { name: 'limitSaleAmount', label: 'LIMIT_SALE_AMOUNT' }
  ];

  constructor(private posService: PosService, private router: Router,
              private notification: NotificationService) {
  }

  fetchItems() {
    this.posService.getPoses(this.dataTable.criteria)
      .then((response) => {
        if (response) {
          this.dataTable.setItems(response);
        }
      });
  }

  delete(pos: any) {
    this.notification.warning('מחיקת חנות' , pos.name).then((confirm) => {
      if (confirm.isConfirmed) {
        this.posService.deletePos(pos.id)
          .then(() => this.fetchItems());
      }
    });
  }

  newPos() {
    this.router.navigate(['/settings', 'pos-form']);

  }
}

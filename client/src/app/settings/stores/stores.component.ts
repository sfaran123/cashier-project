import { Component, OnInit, ViewChild } from '@angular/core';
import { PencilPaper, Trash } from 'src/app/shared/_consts/img-paths';
import { DataTableComponent } from 'src/app/shared/_components/data-table/data-table.component';
import { EmployeeService } from 'src/app/shared/_services/http/employee.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/_services/generic/notification.service';
import {StoreService} from '../../shared/_services/http/store.service';

@Component({
  selector: 'app-table',
  templateUrl: './stores.component.html'

})
export class StoresComponent {

  @ViewChild(DataTableComponent, { static: true }) dataTable: DataTableComponent;


  trash = Trash;
  pencil = PencilPaper;

  readonly columns = [
    { name: 'id', label: 'code' },
    { name: 'storeName', label: 'STORE_NAME' },
    { name: 'address', label: 'ADDRESS' },
    { name: 'businessId', label: 'BUSINESS_ID' },
    { name: 'businessId', label: 'PHONE' },
    { name: 'businessType', label: 'BUSINESS_TYPE' }
  ];

  constructor(private storeService: StoreService, private router: Router,
              private notification: NotificationService) {
  }

  fetchItems() {
    this.storeService.getStores(this.dataTable.criteria)
      .then((response) => {
        if (response) {
          this.dataTable.setItems(response);
        }
      });
  }

  delete(store: any) {
    this.notification.warning('מחיקת חנות' , store.name).then((confirm) => {
      if (confirm.isConfirmed) {
        this.storeService.deleteStore(store.id)
          .then(() => this.fetchItems());
      }
    });
  }

  newStore() {
    this.router.navigate(['/settings', 'store-form']);

  }
}

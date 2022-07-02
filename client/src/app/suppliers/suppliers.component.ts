import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { DataTableComponent } from 'src/app/shared/_components/data-table/data-table.component';

import { NotificationService } from 'src/app/shared/_services/generic/notification.service';
import { SupplierService } from 'src/app/shared/_services/http/supplier.service';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html'
})
export class SuppliersComponent {

  @ViewChild(DataTableComponent, { static: true }) dataTable: DataTableComponent;

  readonly columns = [
    { name: 'id', label: 'CODE' },
    { name: 'internalNumber', label: 'SUPPLIER_NUMBER' },
    { name: 'name', label: 'SUPPLIER_NAME' },
    { name: 'category', label: 'CATEGORY_NAME' },
    { name: 'agent.name', label: 'CONTACT_DETAILS_AGENT' },
    { name: 'office.name', label: 'CONTACT_DETAILS_OFFICE' },
  ];

  constructor(private supplierService: SupplierService, private router: Router,
              private notification: NotificationService) {
  }

  fetchItems() {
    this.supplierService.getSuppliers(this.dataTable.criteria)
      .then(response => this.dataTable.setItems(response));
  }


  deleteSupplier(supplier: any) {
    this.notification.warning('מחיקת לקוח', supplier.firstName + ' האם למחוק את הקוח?').then((confirm) => {
      if (confirm.isConfirmed) {
      this.supplierService.deleteSupplier(supplier.id)
        .then(() => this.fetchItems());
      }
    });
  }
}

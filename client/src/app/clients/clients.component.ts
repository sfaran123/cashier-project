import { Component, ViewChild } from '@angular/core';

import { DataTableComponent } from 'src/app/shared/_components/data-table/data-table.component';

import { ClientService } from 'src/app/shared/_services/http/client.service';
import { NotificationService } from 'src/app/shared/_services/generic/notification.service';
import { ClientModel } from 'src/app/shared/_models/client.model';

@Component({
  selector: 'app-table',
  templateUrl: './clients.component.html',
})
export class ClientsComponent {

  @ViewChild(DataTableComponent, { static: true }) dataTable: DataTableComponent;

  readonly columns = [
    { name: 'idNumber', label: 'BUSINESS_ID_OR_ID_NUMBER' },
    { name: 'number', label: 'NUMBER' },
    { name: 'name', label: 'NAME' },
    { name: 'birthDate', label: 'BIRTH_DATE' },
    { name: 'phone', label: 'PHONE' },
    { name: 'balance', label: 'BALANCE' },
    { name: 'obligo', label: 'OBLIGO' },
    { name: 'centralCustomer', label: 'IS_PARENT_CUSTOMER' },
  ];

  constructor(private clientsService: ClientService, private  notification: NotificationService) {}

  fetchItems(): void {
    this.clientsService.getClients(this.dataTable.criteria)
      .then(response => this.dataTable.setItems(response));
  }

  deleteClient(client: ClientModel): void {
    this.notification.warning('מחיקת לקוח', client.firstName + ' האם למחוק את הקוח?').then(confirm => {
      if (confirm.isConfirmed) {
        this.clientsService.deleteClient(client.id).then(() => this.fetchItems());
      }
    });
  }
}

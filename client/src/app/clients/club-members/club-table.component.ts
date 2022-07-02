import { Component, OnInit, ViewChild } from '@angular/core';

import { DataTableComponent } from 'src/app/shared/_components/data-table/data-table.component';

import { ClubCustomerService } from 'src/app/shared/_services/http/club-customer.service';

@Component({
  selector: 'app-club-table',
  templateUrl: './club-table.component.html',
})
export class ClubTableComponent implements OnInit {

  @ViewChild(DataTableComponent, { static: true }) dataTable: DataTableComponent;

  columns = [
    { name: 'number', label: 'מספר לקוח' },
    { name: 'idNumber', label: 'ת.ז' },
    { name: 'firstName', label: 'שם פרטי' },
    { name: 'lastName', label: 'שם משפחה' },
    { name: 'phone', label: 'טלפון' },
    { name: 'email', label: 'מייל' },
    { name: 'birthDate', label: 'תאריך לידה' },
    { name: 'city', label: 'עיר' },
    { name: 'joinDate', label: 'תאריך הצטרפות' },
    { name: 'expiryDate', label: 'סניף הצטרפות' },
    { name: 'totalPurchases', label: 'סה"כ רכישות' },
    { name: 'totalPoints', label: 'סה"כ נקודות' },
    { name: 'status', label: 'סטטוס' },
    { name: 'isReceivingSMS', label: 'מאשר סמס' },
  ];

  constructor(private clubCustomerService: ClubCustomerService) { }

  ngOnInit() {
  }

  fetchItems() {
  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ClientService } from 'src/app/shared/_services/http/client.service';
import { NotificationService } from 'src/app/shared/_services/generic/notification.service';

import { ErrorMessages } from 'src/app/shared/_consts/error-messages';
import { ClientModel } from 'src/app/shared/_models/client.model';
import { SelectItem } from 'src/app/shared/_consts/select-item';
import { PrinterTypes } from 'src/app/shared/_consts/generic';
import { ClientForm } from 'src/app/shared/_consts/forms/client';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  readonly errorMessages = ErrorMessages;

  form: FormGroup;

  client: ClientModel;

  groups: SelectItem[] = [];

  readonly printerTypes = Object.keys(PrinterTypes).map(module => {
    return { label: PrinterTypes[module], value: module };
  });

  parents: SelectItem[];

  constructor(private route: ActivatedRoute, private router: Router,
              private clientsService: ClientService, private notification: NotificationService) {}

  ngOnInit() {
    const routeData = this.route.snapshot.data;
    this.client = routeData.client;
    this.parents = routeData.parents;
    this.groups = routeData.groups;

    this.form = new ClientForm().form();

    if (this.client) {
      this.form.patchValue(this.client);
      this.checkParentStatus();
    }
  }

  checkParentStatus(): void {
    if (this.client && this.client.isParent) {
      const parentId = this.form.get('parentId');
      parentId.disable();
    }
  }

  submit(): void {
    if (this.form.valid) {
      if (this.client) {
        this.clientsService.updateClient(this.form.value, this.client.id)
          .then(response => this.handleRequest(response));
        return;
      }
      this.clientsService.newClient(this.form.value)
        .then(response => this.handleRequest(response));
    }
  }

  handleRequest(response: boolean): void {
    if (response) {
      this.notification.success(this.client ? 'עדכון לקוח ' : 'לקוח חדש',
        this.client ? 'עדכנת הלקוח בהצלחה' : 'יצרת לקוח בהצלחה');
      this.router.navigate(['/clients']);
    }
  }

  changeParentStatus(checked: boolean): void {
    const parentId = this.form.get('parentId');

    if (checked) {
      parentId.setValue(null);
      parentId.disable();
    } else {
      parentId.enable();
    }
  }
}

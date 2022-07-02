import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

import { ItemsListComponent } from 'src/app/suppliers/invoices/items-list/items-list.component';
import { DocumentSummaryComponent } from 'src/app/shared/_components/document-summary/document-summary.component';

import { DocumentService } from 'src/app/shared/_services/http/document.service';
import { NotificationService } from 'src/app/shared/_services/generic/notification.service';

import { SelectItem } from 'src/app/shared/_consts/select-item';
import { ErrorMessages } from 'src/app/shared/_consts/error-messages';
import { DocumentForm } from 'src/app/shared/_consts/forms/document';
import { DocumentModel } from 'src/app/shared/_models/document.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  @ViewChild(ItemsListComponent, { static: true }) itemsComponent: ItemsListComponent;

  @ViewChild(DocumentSummaryComponent, { static: true }) documentSummaryComponent: DocumentSummaryComponent;

  readonly errorMessages = ErrorMessages;

  documentForm: FormGroup;

  clients: SelectItem[];

  document: DocumentModel;

  docType: string;

  title: string;

  constructor(private route: ActivatedRoute, private documentService: DocumentService,
              private notifications: NotificationService, private router: Router) {}

  ngOnInit() {
    this.document = this.route.snapshot.data.document;
    this.clients = this.route.snapshot.data.clients;
    this.docType = this.route.snapshot.queryParams.docType;

    this.title = this.docType === 'offerPrice' ? 'OFFER_PRICE' : 'SHIPPING_CERTIFICATE';

    this.documentForm = new DocumentForm().form();

    console.log(this.route.snapshot.data);
    if (this.document) {
      this.documentForm.patchValue(this.document);
      console.log(this.documentForm.value);
    }

    this.documentForm.get('documentType').setValue(this.docType);
    this.documentForm.get('entityType').setValue('client');
  }

  calculate(): void {
    this.documentSummaryComponent.calculate(this.documentForm, this.itemsComponent.selectedItems.controls);
  }

  submit(updateInventory?: boolean): void {
    this.documentForm.get('items').patchValue(this.itemsComponent.selectedItems.value);

    console.log(this.documentForm);
    if (this.documentForm.valid) {
      if (this.document) {
        this.documentService.updateDocument(this.documentForm.value, this.document.id, updateInventory)
          .then(response => this.handleResponse(response));
      } else {
        this.documentService.newDocument(this.documentForm.value, updateInventory)
          .then(response => this.handleResponse(response));
      }
    }
  }

  handleResponse(response: boolean): void {
    if (response) {
      this.notifications.success();
      this.router.navigate(['/clients', this.docType === 'offerPrice' ? 'offer-prices' : 'shipping-certificates']);
    }
  }
}

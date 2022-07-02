import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ItemsListComponent } from 'src/app/suppliers/invoices/items-list/items-list.component';
import { DocumentSummaryComponent } from 'src/app/shared/_components/document-summary/document-summary.component';

import { DocumentService } from 'src/app/shared/_services/http/document.service';
import { NotificationService } from 'src/app/shared/_services/generic/notification.service';

import { DocumentModel, DocumentTypesSelect } from 'src/app/shared/_models/document.model';
import { ErrorMessages } from 'src/app/shared/_consts/error-messages';
import { SelectItem } from 'src/app/shared/_consts/select-item';
import { DocumentForm } from 'src/app/shared/_consts/forms/document';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  @ViewChild(ItemsListComponent, { static: true }) itemsComponent: ItemsListComponent;

  @ViewChild(DocumentSummaryComponent, { static: true }) documentSummaryComponent: DocumentSummaryComponent;

  readonly errorMessages = ErrorMessages;

  documentTypes = DocumentTypesSelect;

  documentForm: FormGroup;

  suppliers: SelectItem[];

  document: DocumentModel;

  discountTypes = [
    { name: 'percent', label: 'PERCENT' },
    { name: 'shekel', label: 'SHEKEL' }
  ];

  constructor(private fb: FormBuilder, private route: ActivatedRoute,
              private notifications: NotificationService,
              private documentService: DocumentService, private router: Router) {}

  ngOnInit() {
    this.document = this.route.snapshot.data.document;
    this.suppliers = this.route.snapshot.data.suppliers;

    this.documentForm = new DocumentForm().form();

    if (this.document) {
      this.documentForm.patchValue(this.document);
    }

    this.documentForm.get('entityType').setValue('supplier');
  }

  calculate(): void {
    this.documentSummaryComponent.calculate(this.documentForm, this.itemsComponent.selectedItems.controls);
  }

  submit(updateInventory?: boolean): void {
    this.documentForm.get('items').patchValue(this.itemsComponent.selectedItems.value);

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
      this.router.navigate(['/suppliers', 'invoices']);
    }
  }
}

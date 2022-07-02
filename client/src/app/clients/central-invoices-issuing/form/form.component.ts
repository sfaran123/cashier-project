import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CentralInvoiceService } from 'src/app/shared/_services/http/central-invoice.service';
import { NotificationService } from 'src/app/shared/_services/generic/notification.service';

import { ClientModel } from 'src/app/shared/_models/client.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  client: ClientModel;

  // todo use model
  documents: any[] = [];

  constructor(private route: ActivatedRoute, private centralInvoiceService: CentralInvoiceService,
              private notification: NotificationService, private router: Router) {}

  ngOnInit(): void {
    this.client = this.route.snapshot.data.client;
  }

  addToDocuments(checked: boolean, document: any): void {
    if (checked) {
      this.documents.push({ id: document.id, sumPaid: document.sumToPay });
    } else {
      const index = this.documents.indexOf(doc => doc.id === document.id);
      this.documents.splice(index, 1);
    }
  }

  submit(): void {
    let sum = 0;
    const documents = [];
    this.client.documents.forEach(doc => {
      if (doc.checked) {
        sum += doc.sumToPay;
        documents.push(doc);
      }
    });
    const values = { documents, sum, clientId: this.client.id };
    this.centralInvoiceService.newInvoice(values).then(response => this.handleResponse(response));
  }

  private handleResponse(response: boolean) {
    if (response) {
      this.notification.success();
      this.router.navigate(['/clients', 'central-invoices-issuing']);
    }
  }
}

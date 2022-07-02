import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { SupplierService } from 'src/app/shared/_services/http/supplier.service';
import { NotificationService } from 'src/app/shared/_services/generic/notification.service';

import { SelectItem } from 'src/app/shared/_consts/select-item';
import { percentValidator } from 'src/app/shared/_validators/percent.validator';
import { SupplierModel } from 'src/app/shared/_models/supplier.model';
import { ErrorMessages } from 'src/app/shared/_consts/error-messages';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  readonly errorMessages = ErrorMessages;

  categories: SelectItem[] = [];

  supplier: SupplierModel;

  supplierForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute,
              private supplierService: SupplierService, private notification: NotificationService) {}

  ngOnInit(): void {
    this.categories = this.route.snapshot.data.categories;
    this.supplier = this.route.snapshot.data.supplier;

    this.setForm();

    if (this.supplier) {
      this.supplierForm.patchValue(this.supplier);
    }
  }

  setForm(): void {
    this.supplierForm = this.fb.group({
      name: [],
      internalNumber: [],
      address: [],
      businessNumber: [],
      category: [],
      discount: [null, percentValidator],
      comments: [],
      isLocked: [],
      agent: this.fb.group({
        name: [],
        phone: [],
        type: ['agent'],
        extraPhone: [],
        email: [null, Validators.email],
      }),
      office: this.fb.group({
        name: [],
        phone: [],
        type: ['office'],
        extraPhone: [],
        email: [null, Validators.email],
      }),
      paymentDue: [],
      cashDiscount: [null, percentValidator],
      initialDiscount: [null, percentValidator]
    });
  }

  submit(): void {
    if (this.supplierForm.valid) {
      if (this.supplier) {
        this.supplierService.updateSupplier(this.supplierForm.value, this.supplier.id)
          .then(response => this.handleResponse(response));
      } else {
        this.supplierService.newSupplier(this.supplierForm.value).then(response => this.handleResponse(response));
      }
    }
  }

  private handleResponse(response: boolean) {
    if (response) {
      this.notification.success(this.supplier ? 'עדכון עובד ' : 'עובד חדש',
        this.supplier ? 'עדכנת הלקוח בהצלחה' : 'יצרת לקוח בהצלחה');
      this.router.navigate(['/suppliers']);
    }
  }
}

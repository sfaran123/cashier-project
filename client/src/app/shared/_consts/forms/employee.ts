import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { israelIdValidator } from 'src/app/shared/_validators/israelValidatorId.validator';

export class EmployeeForm {

  fb = new FormBuilder();

  form(): FormGroup {
    return this.fb.group({
      name: [null, Validators.required],
      cardNumber: [],
      IDNumber: [null, [israelIdValidator, Validators.required]],
      externalId: [],
      gender: [null, Validators.required],
      phone: [],
      // extraPhone: [],
      address: [],
      birthDate: [],
      workStartDate: [],
      isCashier: [],
      isCourier: [],
      isManager: [],
      creditAllowed: [],
      discountAllowed: [],
      viewReportAllowed: [],
      ZAllowed: [],
      XAllowed: [],
      refundAllowed: [],
      deleteSaleAllowed: [],
      changeItemPriceAllowed: [],
      isActive: [],
      calculationByShifts: [],
      contact: this.fb.group({
        name: [],
        phone: [],
        proximity: []
      }),
      bank: this.fb.group({
        name: [],
        branch: [],
        accountNumber: []
      }),
    });
  }
}

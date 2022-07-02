import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class ClientForm {

  fb = new FormBuilder();

  form(): FormGroup {
    return this.fb.group({
      IDNumber: [null, Validators.required],
      groupId: [],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      birthDate: [],
      number: [],
      email: [null, [Validators.email, Validators.required]],
      phone: [],
      extraPhone: [],
      comment: [],
      address: [],
      isShippingDocument: [],
      obligo: [],
      hasObligoRenews: [],
      balance: [],
      printerType: [],
      isLocked: [],
      isParent: [],
      parentId: [],
      customerParent: [],
      customerGroup: [],
      isBlocked: [],
      customPriceAllowed: [],
      tagNumber: [],
      isElatResident: [],
      termsOfPayment: [],
      discountPercentage: [],
    });
  }
}

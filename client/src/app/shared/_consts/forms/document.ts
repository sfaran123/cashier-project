import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class DocumentForm {
  fb = new FormBuilder();

  form(): FormGroup {
    return this.fb.group({
      entityId: [null, Validators.required],
      entityType: [null, Validators.required],
      documentType: [null, Validators.required],
      referenceNumber: [],
      date: [null, Validators.required],
      withVat: [],
      sum: [0],
      comments: [],
      discountType: [],
      discountSum: [],
      sumToPay: [0],
      calculatedVat: [0],
      sumPreVat: [0],
      items: []
    });
  }
}

import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-document-summary',
  templateUrl: './document-summary.component.html'
})
export class DocumentSummaryComponent {

  readonly VAT = 0.17;

  isCentralInvoice: boolean;

  items: any[];

  documentForm: FormGroup;

  calculatedSum: number;

  calculatedVat: number;

  calculatedSumPreVat: number;

  calculate(documentForm: FormGroup, items: any[]): void {
    this.documentForm = documentForm;
    this.items = items;

    this.isCentralInvoice = !this.items[0].controls;

    this.calculatedSum = +this.calculateSum().toFixed(2);
    this.calculatedVat = +this.calculateVat().toFixed(2);
    this.calculatedSumPreVat = +this.calculateSumPreVat().toFixed(2);

    this.documentForm.get('sum').patchValue(this.calculatedSum);
    this.documentForm.get('calculatedVat').patchValue(this.calculatedVat);
    this.documentForm.get('sumPreVat').patchValue(this.calculatedSumPreVat);
    this.documentForm.get('sumToPay').patchValue(+(this.calculatedSumPreVat + this.calculatedVat).toFixed(2));
  }

  calculateSum(): number {
    let totalSum = 0;

    this.items.forEach(item => {
      if (!this.isCentralInvoice) {
        totalSum += item.get('sum').value;
      } else {
        totalSum += item.sum / 1.17;
      }
    });

    return totalSum;
  }

  calculateVat(): number {
    if (this.documentForm.get('withVat').value) {
      return (this.calculatedSum - this.calculatedSum / (1 + this.VAT));
    }

    return this.calculatedSum * this.VAT;
  }

  calculateSumPreVat(): number {
    let sum;
    const calculatedSum = this.calculatedSum;
    const discountSum = this.documentForm.get('discountSum').value;

    if (this.documentForm.get('discountType').value === 'percent') {
      sum = calculatedSum * ((100 - discountSum) / 100);
    } else {
      sum = calculatedSum > 0 ? calculatedSum - discountSum : 0;
    }

    if (this.documentForm.get('withVat').value) {
      return sum - this.calculatedVat;
    }

    return sum;
  }
}

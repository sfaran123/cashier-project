import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ItemCustomerPriceModel } from 'src/app/shared/_models/item-customer-price.model';
import { SelectItem } from 'src/app/shared/_consts/select-item';
import { ErrorMessages } from 'src/app/shared/_consts/error-messages';

@Component({
  selector: 'app-customer-prices',
  templateUrl: './customer-prices.component.html'
})
export class CustomerPricesComponent implements OnInit {

  @Input() customerPrices: ItemCustomerPriceModel[] = [];

  @Input() customers: SelectItem[] = [];

  pricesForm: FormGroup;

  errorMessages = ErrorMessages;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.pricesForm = this.fb.group({
      prices: this.fb.array([])
    });

    this.customerPrices.forEach(() => this.addCustomerPrice());
    this.prices.patchValue(this.customerPrices);
  }

  get newPrice(): FormGroup {
    return this.fb.group({
      customerId: this.fb.control(null, Validators.required),
      price: this.fb.control(null, Validators.required)
    });
  }

  get prices(): FormArray {
    return (this.pricesForm.get('prices') as FormArray);
  }


  addCustomerPrice(): void {
    this.prices.push(this.newPrice);
  }

  removeCustomerPrice(index: number): void {
    this.prices.removeAt(index);
  }
}

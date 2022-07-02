import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { DiscountService } from 'src/app/shared/_services/http/discount.service';

import { ErrorMessages } from 'src/app/shared/_consts/error-messages';

@Component({
  selector: 'app-discount-form',
  templateUrl: './discount-form.component.html'
})
export class DiscountFormComponent implements OnInit {

  form: FormGroup;

  readonly errorMessages = ErrorMessages;

  constructor(private fb: FormBuilder, private discountService: DiscountService, private router: Router) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      code: [null, Validators.required],
      name: [null, Validators.required],
      type: [null, Validators.required],
      approvedPercentage: [null],
      managerPercentage: [null],
      discountType: [null],
      minPrice: [null],
      isDuplicated: [null],
      onlyClubMembers: [null],
      activeFrom: [null],
      activeAt: [null],
      isActive: [null]
    });
  }

  submit() {
    this.discountService.newDiscount(this.form.value)
      .then(response => this.handleResponse(response));
  }

  private handleResponse(response: boolean) {
    if (response) {
      this.router.navigate(['/discounts']);
    }
  }
}

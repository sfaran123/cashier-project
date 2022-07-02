import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ClubCustomerService } from 'src/app/shared/_services/http/club-customer.service';

import { ErrorMessages } from 'src/app/shared/_consts/error-messages';

@Component({
  selector: 'app-club-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  readonly errorMessages = ErrorMessages;

  form: FormGroup;

  constructor(private fb: FormBuilder, private clubCustomerService: ClubCustomerService,
              private router: Router) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      clubCode: [null, Validators.required],
      number: [null, Validators.required],
      idNumber: [null, Validators.required],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null],
      comment: [null],
      birthDate: [null],
      city: [null],
      street: [null],
      apartment: [null],
      zipCode: [null],
      phone: [null],
      joinDate: [null],
      expiryDate: [null],
      isEmailReceive: [null],
      isSmsReceive: [null],
      discountPercentage: [null],
      customerGroup: [null],
      isLocked: [null]
    });
  }

  submit() {
    this.clubCustomerService.newClubCustomer(this.form.value).then(response => this.handleResponse(response));
  }

  handleResponse(response) {
    if (response) {
      this.router.navigate(['/club-clients']);
    }
  }

}

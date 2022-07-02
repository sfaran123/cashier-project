import {Component, ElementRef, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CompanyService} from '../../shared/_services/http/company.service';
import {NotificationService} from '../../shared/_services/generic/notification.service';
import {Router} from '@angular/router';
import {BusinessTypes} from '../../shared/_models/company.model';
import {ErrorMessages} from '../../shared/_consts/error-messages';
import {HelpersService} from '../../shared/_services/generic/helpers.service';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html'
})
export class CompanyFormComponent implements OnInit {
  companyForm: FormGroup;

  readonly errorMessages = ErrorMessages;

  readonly businessTypes = Object.keys(BusinessTypes).map( type => {
    return { value: type, label: BusinessTypes[type]};
  });

  constructor(private fb: FormBuilder, private companyService: CompanyService, private notificationService: NotificationService,
              private router: Router, private el: ElementRef, private helpers: HelpersService) {
  }

  ngOnInit() {
    this.companyForm = this.fb.group({
      connectionTerminalNumber: [null],  //TODO relocate to POS level
      companyName: [null, Validators.required],
      companyCategory: [null, Validators.required],
      businessId: [null, Validators.required],
      businessType: [null, Validators.required],
      dataBasePass: [null],
      confirmDataBasePass: [null],
      defaultCurrency: [null],
      profitCalculationMethod: [null, Validators.required],

      hasSubItemReport: [true],
      limitShippingDocumentS: [null],
      includeSubItemProfit: [null],
      isTaxFree: [null],
      hasItemsAutoCounting: [null],
      hasValueCard: [null],
      hasPinPad: [null],
      SaleSellerRequire: [null], // לחייב לבחור מוכר בתחילת מכירה
      hasSeparationLines: [null],
      autoConnectionBetweenEmployeeAndStore: [null],
      allowMenusAmountOfItem: [null],
      documentType: [null],
      creditInvoicePeriod: [null]

    });
  }

  submit() {
    if (this.companyForm.valid) {
    this.companyService.newCompany(this.companyForm.value).then(response => { this.handleResponse(response) });
    } else {
      this.helpers.scrollToError(this.el);
    }
  }

  private handleResponse(response) {
    if (response) {
      this.notificationService.success();
      // this.router.navigate(['/items']);
    }
  }
}


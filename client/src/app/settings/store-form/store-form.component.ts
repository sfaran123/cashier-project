import {Component, ElementRef, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NotificationService} from '../../shared/_services/generic/notification.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BusinessTypes} from '../../shared/_models/company.model';
import {ErrorMessages} from '../../shared/_consts/error-messages';
import {HelpersService} from '../../shared/_services/generic/helpers.service';
import {StoreService} from '../../shared/_services/http/store.service';
import {StoreModel} from '../../shared/_models/store.model';

@Component({
  selector: 'app-company-form',
  templateUrl: './store-form.component.html'
})
export class StoreFormComponent implements OnInit {
  storeForm: FormGroup;

  readonly errorMessages = ErrorMessages;
  store: StoreModel;

  readonly businessTypes = Object.keys(BusinessTypes).map( type => {
    return { value: type, label: BusinessTypes[type]};
  });

  constructor(private fb: FormBuilder, private storeService: StoreService, private notificationService: NotificationService,
              private router: Router,  private route: ActivatedRoute, private el: ElementRef, private helpers: HelpersService) {
  }

  ngOnInit() {
    this.store = this.route.snapshot.data.store;
    this.loadForm();
    if (this.store) {
      this.storeForm.patchValue(this.store);
    }
  }

  loadForm() {
    this.storeForm = this.fb.group({
      storeCode: [ null, Validators.required],
      storeName: [ null, Validators.required ],
      address: [ null ],
      businessId : [ null ],
      phone: [ null ],
      businessType: [ null ],
      printingSetting: this.fb.group({
        phoneNumber: [ null ],
        invoiceHeaderText: [ null ],
        invoiceFooterText: [ null ],
        isBonPrintingAfterPayment: [ null ]
      }),
      tenBisForm: this.fb.group({
        userName: [ null ],
        password: [ null ],
        restaurantCode: [ null ],
      }),
      valueCardForm: this.fb.group({
        storeId: [ null ],
        password: [ null ],
      })
    });
  }

  submit() {
    if (this.storeForm.valid) {
      if (this.store) {
        this.storeService.updateStore(this.storeForm.value, this.store.storeCode)
          .then(response => this.handleResponse(response));
      } else {
      this.storeService.newStore(this.storeForm.value).then((res) => {
        if (res) {
          this.handleResponse(res);
        }
      });
      }
    }
  }

  private handleResponse(response) {
    if (response) {
      this.notificationService.success('');
      // this.router.navigate(['/items']);
    }
  }
}


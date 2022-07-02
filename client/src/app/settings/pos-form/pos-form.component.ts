import {Component, ElementRef, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NotificationService} from '../../shared/_services/generic/notification.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BusinessTypes} from '../../shared/_models/company.model';
import {ErrorMessages} from '../../shared/_consts/error-messages';
import {HelpersService} from '../../shared/_services/generic/helpers.service';
import {StoreService} from '../../shared/_services/http/store.service';
import {StoreModel} from '../../shared/_models/store.model';
import {PosService} from '../../shared/_services/http/pos.service';
import {PosModel} from '../../shared/_models/pos.model';

@Component({
  selector: 'app-company-form',
  templateUrl: './pos-form.component.html'
})
export class PosFormComponent implements OnInit {
  posForm: FormGroup;

  readonly errorMessages = ErrorMessages;
  pos: PosModel;

  readonly businessTypes = Object.keys(BusinessTypes).map( type => {
    return { value: type, label: BusinessTypes[type]};
  });

  constructor(private fb: FormBuilder, private posService: PosService, private notificationService: NotificationService,
              private router: Router,  private route: ActivatedRoute, private el: ElementRef, private helpers: HelpersService) {
  }

  ngOnInit() {
    this.pos = this.route.snapshot.data.pos;
    this.loadForm();
    if (this.pos) {
      this.posForm.patchValue(this.pos);
    }
  }

  loadForm() {
    this.posForm = this.fb.group({
      name: [ null, Validators.required],
      internalNumber: [ null, Validators.required ],
      decimalCircle: [ null ],
      maxSaleAmount : [ null ],
      limitSaleAmount: [ null ],
    });
  }

  submit() {
    if (this.posForm.valid) {
      if (this.pos) {
        this.posService.updatePos(this.posForm.value, this.pos.id)
          .then(response => this.handleResponse(response));
      } else {
      this.posService.newPos(this.posForm.value).then((res) => {
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
      this.router.navigate(['/settings', 'poses']);
    }
  }
}


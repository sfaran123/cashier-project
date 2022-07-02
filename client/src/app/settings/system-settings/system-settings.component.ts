import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-system-settings',
  templateUrl: './system-settings.component.html',
  styleUrls: ['./system-settings.component.styl']
})
export class SystemSettingsComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.setForm();
  }

  setForm() {
    this.form = this.fb.group({
      companyCode: [null],
      companyName: [null],
      companyCategory: [null],
      messengerPhone: ['asas'],
      messagesBalance: [null],
      isMessagesRenewed: [null],
      automaticItemCounting: [null],
      isPosCompany: [null],
      IsRechargeableCard: [null],
      isForcePassChange: [null],
      isUniqueCustomer: [null],
      hasOnlineSore: [null],
      supportNumber: [null],
      hasCreditTerminal: [null],
      itemProperties: [null],
      profitCalculationSetting: [null],
      priorityInterface: [null],
    });
  }

}

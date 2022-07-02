import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ErrorMessages } from 'src/app/shared/_consts/error-messages';
import { CampaignService } from 'src/app/shared/_services/http/campaign.service';

@Component({
  selector: 'app-campaign-form',
  templateUrl: './campaign-form.component.html',
})
export class CampaignFormComponent implements OnInit {

  readonly errorMessages = ErrorMessages;

  form: FormGroup;
  campaignType: string;

  constructor(private fb: FormBuilder, private campaignService: CampaignService,
              private router: Router) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: [null, Validators.required],
      type: [null, Validators.required],
      activeFrom: [null],
      activeAt: [null],
      stores: [null],
      isActive: [null],
      onlyClubCustomer: [null],
      isAutoActive: [null],
      items: [null],
      customers: [null]
    });
  }

  getCampaignType(value: string) {
    this.campaignType = value;
  }

  submit() {
    this.campaignService.newCampaign(this.form.value)
      .then(response => this.handleResponse(response));
  }

  private handleResponse(response: any) {
    if (response) {
      this.router.navigate(['/campaigns']);
    }
  }
}

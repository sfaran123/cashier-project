import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseHttpService } from './base-http.service';

import { DataTableResponse } from 'src/app/shared/_components/data-table/classes/data-table-response';
import { DataTableCriteria } from 'src/app/shared/_components/data-table/classes/data-table-criteria';

import { DiscountModel } from 'src/app/shared/_models/discount.model';

@Injectable()
export class CampaignService extends BaseHttpService {

  private readonly endPoint = this.apiUrl + '/campaign';

  constructor(private http: HttpClient) {
    super();
  }

  getCampaigns(criteria: DataTableCriteria): Promise<DataTableResponse> {
    return this.http.post(this.endPoint + '/campaigns', this.setDataTableParams(criteria))
      .toPromise()
      .then(response => response as DataTableResponse)
      .catch(() => null);
  }

  // todo campaign model
  getCampaign(campaignId: number): Promise<any> {
    return this.http.get(this.endPoint + '/' + campaignId)
      .toPromise()
      .then(response => response as any)
      .catch(() => null);
  }

  newCampaign(values: object): Promise<any> {
    return this.http.post(this.endPoint, values)
      .toPromise()
      .then(response => response)
      .catch(() => null);
  }

  updateCampaign(values: object, campaignId: number): Promise<boolean> {
    return this.http.put(this.endPoint + '/' + campaignId, values)
      .toPromise()
      .then(() => true)
      .catch(() => false);
  }

  deleteCampaign(campaignId: number): Promise<boolean> {
    return this.http.delete(this.endPoint + '/' + campaignId)
      .toPromise()
      .then(() => true)
      .catch(() => false);
  }
}

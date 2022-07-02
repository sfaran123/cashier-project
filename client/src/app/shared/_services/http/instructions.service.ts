import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { InstructionModel } from 'src/app/shared/_models/instruction.model';

import { BaseHttpService } from './base-http.service';

import { DataTableResponse } from 'src/app/shared/_components/data-table/classes/data-table-response';
import { DataTableCriteria } from 'src/app/shared/_components/data-table/classes/data-table-criteria';


@Injectable()
export class InstructionsService extends BaseHttpService {

  private readonly endPoint = this.apiUrl + '/instruction';

  constructor(private http: HttpClient) {
    super();
  }

  getInstructions(criteria?: DataTableCriteria): Promise<DataTableResponse> {
    const params = criteria ? this.setDataTableParams(criteria) : null;

    return this.http.post(this.endPoint + '/search', params)
      .toPromise()
      .then(response => response as DataTableResponse)
      .catch(() => null);
  }

  newInstruction(values: InstructionModel): Promise<any> {
    return this.http.post(this.endPoint, values)
      .toPromise()
      .then(response => response)
      .catch(() => null);
  }

  updateInstruction(values: object, instructionId: number): Promise<boolean> {
    return this.http.put(this.endPoint + '/' + instructionId, values)
      .toPromise()
      .then(() => true)
      .catch(() => false);
  }

  deleteInstruction(instructionId: number): Promise<boolean> {
    return this.http.delete(this.endPoint + '/' + instructionId)
      .toPromise()
      .then(() => true)
      .catch(() => false);
  }
}

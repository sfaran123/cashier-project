import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { InstructionsService } from 'src/app/shared/_services/http/instructions.service';

@Injectable()
export class InstructionsResolve implements Resolve<any> {

  constructor(private instructionsService: InstructionsService) {}

  resolve() {
    return this.instructionsService.getInstructions().then(response => response.items);
  }
}

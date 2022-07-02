import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { InstructionsService } from 'src/app/shared/_services/http/instructions.service';
import { NotificationService } from 'src/app/shared/_services/generic/notification.service';

import { InstructionModel } from 'src/app/shared/_models/instruction.model';
import { ErrorMessages } from 'src/app/shared/_consts/error-messages';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
})
export class FormDialogComponent implements OnInit {

  form: FormGroup;

  instruction: InstructionModel;

  errorMessages = ErrorMessages;

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<InstructionModel>,
              @Inject(MAT_DIALOG_DATA) public data: any, private instructionService: InstructionsService,
              private notifications: NotificationService) {
  }

  ngOnInit() {
    this.instruction = this.data.instruction;
    console.log(this.instruction);

    this.form = this.fb.group({
      name: [null, Validators.required],
      isDefault: [null],
      color: ['#007aff', Validators.required]
    });

    if (this.instruction) {
      this.form.patchValue(this.instruction);
    }
  }

  submit(): void {
    if (this.form.valid) {
      if (this.instruction) {
        this.instructionService.updateInstruction(this.form.value, this.instruction.id).then(res => this.handleResponse(res));
      } else {
        this.instructionService.newInstruction(this.form.value).then(res => this.handleResponse(res));
      }
    }
  }

  handleResponse(response: boolean): void {
    if (response) {
      this.notifications.success();
      this.dialogRef.close(true);
    }
  }
}

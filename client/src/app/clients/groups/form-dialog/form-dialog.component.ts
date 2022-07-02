import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { GroupService } from 'src/app/shared/_services/http/group.service';
import { NotificationService } from 'src/app/shared/_services/generic/notification.service';

import { GroupModel } from 'src/app/shared/_models/group.model';
import { ErrorMessages } from 'src/app/shared/_consts/error-messages';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html'
})
export class FormDialogComponent {

  errorMessages = ErrorMessages;

  constructor(private dialogRef: MatDialogRef<FormDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public group: GroupModel, private groupService: GroupService,
              private notifications: NotificationService) {}

  submit(form: NgForm): void {
    if (form.valid) {
      if (this.group.id) {
        this.groupService.updateGroup(form.value, this.group.id).then(response => this.handleResponse(response));
      } else {
        this.groupService.newGroup(form.value, 'clients').then(response => this.handleResponse(response));
      }
    }
  }

  handleResponse(response: boolean): void {
    if (response) {
      this.dialogRef.close(true);
      this.notifications.success();
    }
  }
}

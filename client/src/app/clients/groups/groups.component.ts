import { Component, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { DataTableComponent } from 'src/app/shared/_components/data-table/data-table.component';
import { FormDialogComponent } from 'src/app/clients/groups/form-dialog/form-dialog.component';

import { NotificationService } from 'src/app/shared/_services/generic/notification.service';
import { GroupService } from 'src/app/shared/_services/http/group.service';

import { GroupModel } from 'src/app/shared/_models/group.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html'
})
export class GroupsComponent implements OnDestroy {
  @ViewChild(DataTableComponent, { static: true }) dataTable: DataTableComponent;

  readonly columns = [
    { name: 'name', label: 'NAME' },
    { name: 'membersCount', label: 'MEMBER_COUNT' }
  ];

  sub = new Subscription();

  constructor(private groupService: GroupService, private  notification: NotificationService,
              private dialog: MatDialog) {}

  fetchItems(): void {
    this.groupService.getGroups('clients', this.dataTable.criteria)
      .then(response => this.dataTable.setItems(response));
  }

  openGroupDialog(group?: GroupModel): void {
    const dialog = this.dialog.open(FormDialogComponent, {
      data: group,
      width: '370px'
    });

    this.sub.add(dialog.afterClosed().subscribe(reload =>  reload ? this.fetchItems() : null));
  }

  deleteClient(group: GroupModel): void {
    this.notification.warning('מחיקת קבוצה', group.name + ' האם למחוק את הקבוצה?').then(confirm => {
      if (confirm.isConfirmed) {
        this.groupService.deleteGroup(group.id).then(() => this.fetchItems());
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}

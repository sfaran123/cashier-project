import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { GroupModel } from 'src/app/shared/_models/group.model';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styles: [':host { direction: rtl } .table-height { max-height: 300px; overflow: auto }']
})
export class GroupsComponent implements OnInit {

  groups: GroupModel[];

  allGroups: GroupModel[];

  searchWord: string;

  selectedGroups: GroupModel[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: { groups: GroupModel[], selectedGroups: GroupModel[] },
              public dialogRef: MatDialogRef<GroupsComponent>) {}

  ngOnInit(): void {
    this.allGroups = this.groups = this.data.groups;

    this.groups.filter(group => {
      if (this.data.selectedGroups.find(g => g.id === group.id)) {
        this.selectGroup(true, group);
      }
    });
  }

  selectGroup(isChecked: boolean, group: GroupModel): void {
    const selectedGroup = this.groups.find(g => g.id === group.id);
    selectedGroup['checked'] = isChecked;

    if (isChecked) {
      this.selectedGroups.push(group);
    } else {
      const index = this.selectedGroups.indexOf(group);
      this.selectedGroups.splice(index, 1);
    }
  }

  search(): void {
    if (this.searchWord) {
      this.groups = this.groups.filter(group => group.name.includes(this.searchWord));
    } else {
      this.groups = this.allGroups;
    }
  }

  submit(): void {
    this.dialogRef.close(this.selectedGroups);
  }
}

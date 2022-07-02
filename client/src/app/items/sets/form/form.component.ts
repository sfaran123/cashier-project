import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { GroupsComponent } from 'src/app/shared/_dialogs/groups/groups.component';

import { SetService } from 'src/app/shared/_services/http/set.service';
import { NotificationService } from 'src/app/shared/_services/generic/notification.service';

import { ErrorMessages } from 'src/app/shared/_consts/error-messages';
import { slideDown } from 'src/app/shared/_consts/animations';
import { GroupModel } from 'src/app/shared/_models/group.model';
import { GroupItemModel } from 'src/app/shared/_models/group-item.model';
import { CategoryModel } from 'src/app/shared/_models/category.model';
import { SetModel } from 'src/app/shared/_models/set.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  animations: [slideDown]
})
export class FormComponent implements OnInit, OnDestroy {

  @ViewChild(GroupsComponent, { static: true }) group: GroupsComponent;

  readonly errorMessages = ErrorMessages;

  readonly sub = new Subscription();

  setForm: FormGroup;

  groupsSet: SetModel;

  selectedCategoryId: number;

  categories: CategoryModel[] = [];

  subCategories: CategoryModel[] = [];

  constructor(private fb: FormBuilder, private dialog: MatDialog,
              private notifications: NotificationService, private route: ActivatedRoute,
              private setService: SetService, private router: Router) {}

  ngOnInit(): void {
    this.categories = this.route.snapshot.data.categories;
    this.groupsSet = this.route.snapshot.data.set;
    this.initForm();

    if (this.groupsSet) {
      this.groupsSet.groups.forEach(group => this.addGroup(group.items));

      this.selectedCategoryId = this.groupsSet.categoryId;
      this.setSubCategories();

      this.setForm.patchValue(this.groupsSet);
    }
  }

  private initForm(): void {
    this.setForm = this.fb.group({
      name: this.fb.control(null, Validators.required),
      code: this.fb.control(null, Validators.required),
      price: this.fb.control(null, Validators.required),
      categoryId: this.fb.control(null, Validators.required),
      subCategoryId: this.fb.control(null, Validators.required),
      groups: this.fb.array([])
    });
  }

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.groups.controls, event.previousIndex, event.currentIndex);
    this.groups.controls[event.previousIndex].get('priority').patchValue(event.currentIndex);
  }

  get groups(): FormArray {
    return this.setForm.get('groups') as FormArray;
  }

  addGroup(items?: GroupItemModel[]): void {
    this.groups.push(this.newGroup(items));
  }

  setSubCategories(): void {
    const category = this.categories.find(c => c.id === this.selectedCategoryId);
    this.subCategories = category.subCategories;
  }

  newGroup(items?: GroupItemModel[]): FormGroup {
    const itemsArray = [];

    if (items) {
      items.forEach(() => itemsArray.push(this.newItem()));
    }

    return this.fb.group({
      id: this.fb.control(null),
      name: this.fb.control(null),
      maxItems: this.fb.control(0),
      minItems: this.fb.control(0),
      freeItemsAllowed: this.fb.control(0),
      itemsCount: this.fb.control(0),
      priority: this.fb.control(null),
      items: this.fb.array(itemsArray)
    });
  }

  setGroups(groups: GroupModel[]): void {
    groups.forEach(group => this.addGroup(group.items));

    this.groups.patchValue(groups);
  }

  newItem(): FormGroup {
    return this.fb.group({
      id: this.fb.control(null),
      name: this.fb.control(null),
      code: this.fb.control(0),
      price: this.fb.control(0)
    });
  }

  openGroupsDialog(): void {
    console.log(this.groups.value);
    const dialog = this.dialog.open(GroupsComponent, {
      width: '470px',
      data: {
        groups: this.route.snapshot.data.groups,
        selectedGroups: this.groups.value
      }
    });

    this.sub.add(dialog.afterClosed().subscribe(groups => {
      if (groups) {
        this.groups.clear();
        this.setGroups(groups);
      }
    }));
  }

  submit(): void {
    if (this.setForm.valid) {
      if (this.groupsSet) {
        this.setService.updateSet(this.setForm.value, this.groupsSet.id).then(response => this.handleResponse(response));
      } else {
        this.setService.newSet(this.setForm.value).then(response => this.handleResponse(response));
      }
    }
  }

  removeGroup(groupIndex: number): void {
    this.groups.removeAt(groupIndex);
  }

  handleResponse(response: boolean): void {
    if (response) {
      this.notifications.success();
      this.router.navigate(['/items', 'sets']);
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { GroupService } from 'src/app/shared/_services/http/group.service';
import { NotificationService } from 'src/app/shared/_services/generic/notification.service';

import { ErrorMessages } from 'src/app/shared/_consts/error-messages';
import { SelectItem } from 'src/app/shared/_consts/select-item';
import { GroupModel } from 'src/app/shared/_models/group.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  form: FormGroup;

  group: GroupModel;

  selectItems: SelectItem[] = [];

  errorMessages = ErrorMessages;

  constructor(private fb: FormBuilder, private route: ActivatedRoute,
              private notifications: NotificationService, private itemGroups: GroupService,
              private router: Router) {}

  ngOnInit(): void {
    this.selectItems = this.route.snapshot.data.selectItems;
    this.group = this.route.snapshot.data.group;

    this.form = this.fb.group({
      name: [null, Validators.required],
      items: this.fb.array([])
    });

    if (this.group) {
      this.group.items.forEach(() => this.addItem());
      this.form.patchValue(this.group);
    }
  }

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.items.controls, event.previousIndex, event.currentIndex);
    this.items.controls[event.previousIndex].get('priority').patchValue(event.currentIndex);
  }

  get items(): FormArray {
    return this.form.get('items') as FormArray;
  }

  newItem(): FormGroup {
    return this.fb.group({
      id: this.fb.control(null, Validators.required),
      code: this.fb.control(null, Validators.required),
      name: this.fb.control(null, Validators.required),
      price: this.fb.control(null),
      priority: this.fb.control(null),
    });
  }

  addItem(): void {
    this.items.push(this.newItem());
  }

  removeGroup(index: number): void {
    this.items.removeAt(index);
  }

  selectItem(index: number, value: string | number, target: string): void {
    const source = target === 'name' ? 'id' : 'name';
    const item = this.selectItems.find(i =>  i[source] === value);

    this.items.at(index).get('id').setValue(item.id);
    this.items.at(index).get(target).setValue(item[target]);
  }

  submit(): void {
    if (this.form.valid) {
      if (this.group) {
        this.itemGroups.updateGroup(this.form.value, this.group.id).then(response => this.handleResponse(response));
      } else {
        this.itemGroups.newGroup(this.form.value, 'items').then(response => this.handleResponse(response));
      }
    }
  }

  handleResponse(response: boolean): void {
    if (response) {
      this.notifications.success();
      this.router.navigate(['/items', 'groups']);
    }
  }
}

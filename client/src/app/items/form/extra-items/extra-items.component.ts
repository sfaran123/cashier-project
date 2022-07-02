import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { SelectItem } from 'src/app/shared/_consts/select-item';
import { ItemModel } from 'src/app/shared/_models/item.model';

@Component({
  selector: 'app-extra-items',
  templateUrl: './extra-items.component.html'
})
export class ExtraItemsComponent implements OnInit {

  @Input() selectedExtraItems: ItemModel[] = [];

  @Input() extraItemsSelect: SelectItem[] = [];

  extraItemsForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.extraItemsForm = this.fb.group({
      items: this.fb.array([]),
    });

    this.selectedExtraItems.forEach(() => this.addItem());
    this.items.patchValue(this.selectedExtraItems);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.items.controls, event.previousIndex, event.currentIndex);
    this.items.controls[event.previousIndex].get('priority').patchValue(event.currentIndex);
  }

  get items(): FormArray {
    return this.extraItemsForm.get('items') as FormArray;
  }

  newItem(): FormGroup {
    return this.fb.group({
      id: this.fb.control(null, Validators.required),
      code: this.fb.control(null, Validators.required),
      name: this.fb.control(null),
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
    const source = target === 'name' ? 'code' : 'name';
    const item = this.extraItemsSelect.find(i =>  i[source] === value);

    this.items.at(index).get(target).setValue(item[target]);
    this.items.at(index).get('id').setValue(item.id);
  }
}

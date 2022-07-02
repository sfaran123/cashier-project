import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

import { ItemModel } from 'src/app/shared/_models/item.model';

@Component({
  selector: 'app-sub-items',
  templateUrl: './sub-items.component.html'
})
export class SubItemsComponent implements OnInit {

  @Input() subItems: ItemModel[];

  subItemsForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.subItemsForm = this.fb.group({
      items: this.fb.array([])
    });

    this.subItems.forEach(() => this.addItem());
    this.items.patchValue(this.subItems);
  }

  get items(): FormArray {
    return (this.subItemsForm.get('items') as FormArray);
  }

  addItem(): void {
    this.items.push(this.newItemItem());
  }

  newItemItem(): FormGroup {
    return this.fb.group({
      barcode: this.fb.control(null),
      color: this.fb.control(null),
      size: this.fb.control(null),
      unitsInStock: this.fb.control(0)
    });
  }

  removeSubItem(index: number): void {
    this.items.removeAt(index);
  }
}

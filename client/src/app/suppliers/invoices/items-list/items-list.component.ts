import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ItemService } from 'src/app/shared/_services/http/item.service';

import { fade } from 'src/app/shared/_consts/animations';
import { ItemModel } from 'src/app/shared/_models/item.model';
import { ItemInventoryModel } from 'src/app/shared/_models/item-inventory.model';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.styl'],
  animations: [fade]
})
export class ItemsListComponent implements OnInit {

  constructor(private itemService: ItemService, private fb: FormBuilder) {}

  @Output() updateSum = new EventEmitter();

  @Input() documentItems: ItemModel[];

  items: any;

  selectedItem: ItemModel;

  documentForm = this.fb.group({
    selectedItems: this.fb.array([])
  });

  ngOnInit(): void {
    this.itemService.selectWithInventories().then(response => this.items = response);

    this.documentItems.forEach((item, index) => {
      this.selectedItem = item;
      this.addItem();
      this.setSum(index);
    });

    this.updateSum.emit();
  }

  get selectedItems(): FormArray {
    return (this.documentForm.get('selectedItems') as FormArray);
  }

  inventories(index: number): FormArray {
    return this.selectedItems.at(index).get('inventories') as FormArray;
  }

  addItem(): void {
    this.selectedItems.push(this.newItem());
    this.updateSum.emit();
  }

  newItem(): FormGroup {
    const inventoriesArray = [];

    if (this.selectedItem) {
      this.selectedItem.inventories.forEach(() => {
        inventoriesArray.push(this.newInventory());
      });
    }

    const selectedItem = this.fb.group({
      id: this.fb.control(null),
      code: this.fb.control(null),
      name: this.fb.control(null),
      amount: this.fb.control(0),
      price: this.fb.control(0),
      sum: this.fb.control(0),
      discount: this.fb.control(0),
      inventories: this.fb.array(inventoriesArray),
      inventory: this.fb.control(null, Validators.required),
      inventoryId: this.fb.control(null, Validators.required),
    });

    if (this.selectedItem) {
      selectedItem.patchValue(this.selectedItem);
    }

    return selectedItem;
  }

  setInventoryId(index: number, inventory: ItemInventoryModel): void {
    this.selectedItems.at(index).get('inventoryId').setValue(inventory.id);
  }

  newInventory(): FormGroup {
    return this.fb.group({
      id: this.fb.control(null),
      barcode: this.fb.control(null),
      size: this.fb.control(null),
      color: this.fb.control(null),
      unitsInStock: this.fb.control(null),
    });
  }

  setSum(index: number): void {
    const item = this.selectedItems.at(index);
    const price = item.get('price').value;
    const amount = item.get('amount').value;
    const discount = item.get('discount').value;
    const sum = price * amount * ((100 - discount) / 100);

    item.get('sum').patchValue(sum);
    this.updateSum.emit();
  }

  removeItem(index: number): void {
    this.selectedItems.removeAt(index);
    this.updateSum.emit();
  }
}

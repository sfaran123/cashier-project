import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MenuElementService } from 'src/app/shared/_services/http/menu-element.service';

import { ItemModel } from 'src/app/shared/_models/item.model';
import { ItemInventoryModel } from 'src/app/shared/_models/item-inventory.model';
import { ItemService } from 'src/app/shared/_services/http/item.service';

@Component({
  selector: 'app-menu-items',
  templateUrl: './menu-items.component.html',
})
export class MenuItemsComponent implements OnInit {

  form: FormGroup;

  selectedItem: ItemModel;

  items: ItemInventoryModel[];

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private itemService: ItemService,
              private menuElementService: MenuElementService, private router: Router) { }

  ngOnInit() {
    this.items = this.route.snapshot.data.selectItems;
    const menuItems = this.route.snapshot.data.menuItems;

    this.form = this.fb.group({
      menuItems: this.fb.array([])
    });

    if (menuItems) {
      menuItems.forEach(() => this.addNewItem());
      this.menuItems.patchValue(menuItems);
    }
  }

  inventories(index: number): FormArray {
    return this.menuItems.at(index).get('inventories') as FormArray;
  }

  get menuItems(): FormArray {
    return this.form.get('menuItems') as FormArray;
  }

  setInventoryId(index: number, inventory: ItemInventoryModel): void {
    this.menuItems.at(index).get('inventoryId').setValue(inventory.id);
  }

  addNewItem(): void {
    this.menuItems.push(this.fb.group({
      id: [],
      code: [],
      name: [],
      color: [],
      price: [],
      type: ['item'],
      serialNumber: []
    }));
  }

  addItem(): void {
    this.menuItems.push(this.fb.group({
      id: this.selectedItem.id,
      code: this.selectedItem.code,
      name: this.selectedItem.name,
      color: [],
      type: ['item'],
      price: this.selectedItem.customerPrice,
      serialNumber: []
    }));
  }

  removeItem(index: number): void {
    this.menuItems.removeAt(index);
  }

  onSelect(index, event, source) {
    const item = this.menuItems.at(index);
    if (source === 'id') {
      const handle = item.get('code');
      handle.setValue(event.value);
    } else {
      const handle = item.get('code');
      handle.setValue(event.value);
    }
  }

  submit() {
    this.menuElementService.updateMainMenuItems(this.form.value).then(() => this.router.navigate(['/items', 'menu']));
  }
}

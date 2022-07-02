import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MenuElementService } from 'src/app/shared/_services/http/menu-element.service';
import { NotificationService } from 'src/app/shared/_services/generic/notification.service';

import { ErrorMessages } from 'src/app/shared/_consts/error-messages';

import { ItemModel } from 'src/app/shared/_models/item.model';
import { MenuModel } from 'src/app/shared/_models/menu.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  form: FormGroup;

  errorMessages = ErrorMessages;

  items: ItemModel[];

  deletedIds: number[] = [];

  menu: MenuModel;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private notifications: NotificationService,
              private menuElementService: MenuElementService, private router: Router) {}

  ngOnInit() {
    this.items = this.route.snapshot.data.selectItems;
    this.menu = this.route.snapshot.data.menu;

    this.form = this.fb.group({
      name: [null, Validators.required],
      serialNumber: [null],
      color: ['#0062c3'],
      subMenus: this.fb.array([]),
      menuItems: this.fb.array([]),
      deletedIds: [null],
    });

    if (this.menu) {
      this.menu.subMenus.forEach(() => this.addSubMenu());
      this.menu.menuItems.forEach(() => this.addMenuItem());

      this.form.patchValue(this.menu);
    }
  }

  get subMenus(): FormArray {
    return this.form.get('subMenus') as FormArray;
  }

  addSubMenu(): void {
    this.subMenus.push(this.newSubMenu());
  }

  newSubMenu(): FormGroup {
    return this.fb.group({
      id: this.fb.control(null),
      name: this.fb.control(null),
      serialNumber: this.fb.control(null),
      color: this.fb.control('#0287c2')
    });
  }

  get menuItems(): FormArray {
    return this.form.get('menuItems') as FormArray;
  }

  addMenuItem(): void {
    this.menuItems.push(this.newMenuItem());
  }

  newMenuItem(): FormGroup {
    return this.fb.group({
      id: this.fb.control(null),
      name: this.fb.control(null),
      barcode: this.fb.control(null),
      serialNumber: this.fb.control(null),
      color: this.fb.control('#0287c2')
    });
  }

  editSubMenu(index: number): void {
    const id = this.subMenus.at(index).get('id').value;
    if (id) {
      this.router.navigate(['/items', 'menu' , 'form', id]).then(() => window.location.reload());
    } else {
      this.notifications.error('נא לשמור את התפריט הראשי קודם כדי שתוכל לערוך');
    }
  }

  removeSubMenu(index: number): void {
    const deletedId = this.subMenus.at(index).get('id').value;
    if (deletedId) {
      this.deletedIds.push(deletedId);
    }

    this.subMenus.removeAt(index);
  }

  removeItem(index: number): void {
    (this.form.get('menuItems') as FormArray).removeAt(index);
  }

  onSelect(index, event, source) {
    const item = this.menuItems.at(index);
    if (source === 'id') {
      item.get('id').setValue(event.value);
    } else {
      item.get('id').setValue(event.value);
    }
  }

  submit(): void {
    if (this.form.valid) {
      if (this.menu) {
        this.menuElementService.updateMenuElement(this.form.value, this.menu.id).then(response => this.handleResponse(response));
      } else {
        this.menuElementService.newMenuElement(this.form.value).then(response => this.handleResponse(response));
      }
    }
  }

  handleResponse(response: boolean): void {
    if (response) {
      this.notifications.success();
      this.router.navigate(['/items', 'menu']);
    }
  }
}

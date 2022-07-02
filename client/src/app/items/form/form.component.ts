import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { ExtraItemsComponent } from 'src/app/items/form/extra-items/extra-items.component';
import { InstructionsComponent } from 'src/app/items/form/instructions/instructions.component';
import { CustomerPricesComponent } from 'src/app/items/form/customer-prices/customer-prices.component';
import { SubItemsComponent } from 'src/app/items/form/sub-items/sub-items.component';

import { ItemService } from 'src/app/shared/_services/http/item.service';
import { NotificationService } from 'src/app/shared/_services/generic/notification.service';
import { HelpersService } from 'src/app/shared/_services/generic/helpers.service';

import { SelectItem } from 'src/app/shared/_consts/select-item';
import { ErrorMessages } from 'src/app/shared/_consts/error-messages';
import { percentValidator } from 'src/app/shared/_validators/percent.validator';
import { ItemModel } from 'src/app/shared/_models/item.model';
import { InstructionModel } from 'src/app/shared/_models/instruction.model';
import { CategoryModel } from 'src/app/shared/_models/category.model';

@Component({
  selector: 'app-new-item',
  templateUrl: './form.component.html'
})

export class FormComponent implements OnInit {

  @ViewChild(ExtraItemsComponent, { static: true }) extraItemsComponent: ExtraItemsComponent;
  @ViewChild(InstructionsComponent, { static: true }) instructionsComponent: InstructionsComponent;
  @ViewChild(CustomerPricesComponent, { static: true }) customerPricesComponent: CustomerPricesComponent;
  @ViewChild(SubItemsComponent, { static: true }) subItemsComponent: SubItemsComponent;

  readonly errorMessages = ErrorMessages;

  categories: CategoryModel[] = [];

  subCategories: CategoryModel[] = [];

  selectedCategoryId: number;

  customers: SelectItem[] = [];

  suppliers: SelectItem[] = [];

  itemsSelect: SelectItem[] = [];

  instructions: InstructionModel[] = [];

  item: ItemModel;

  itemForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private notification: NotificationService,
              private route: ActivatedRoute, private itemService: ItemService,
              private el: ElementRef, private helpers: HelpersService) {}

  ngOnInit(): void {
    const data = this.route.snapshot.data;
    this.item = data.item;
    this.itemsSelect = data.itemsSelect;
    this.categories = data.categories;
    this.instructions = data.instructions;
    this.customers = data.customers;
    this.suppliers = data.suppliers;

    this.setForm();

    if (this.item) {
      this.selectedCategoryId = this.item.categoryId;
      this.setSubCategories();

      this.itemForm.patchValue(this.item);
    }
  }

  private setForm(): void {
    this.itemForm = this.fb.group({
      subItems: [],
      customerPrices: [],
      code: [null, Validators.required, this.checkCodeExists.bind(this)],
      description: [null, Validators.required],
      customerPrice: [null, Validators.required],
      includesVat: [],
      costPrice: [],
      minChainAmount: [],
      maxChainAmount: [],
      minStoreAmount: [],
      maxStoreAmount: [],
      isWeighable: [],
      isTaxed: [],
      isRenameEnabled: [],
      isAdditionalPercentage: [],
      isInventoryManager: [],
      allowPriceZero: [],
      isExtra: [],
      notDiscountable: [],
      isLockedForSale: [],
      requiresManager: [],
      categoryId: [],
      subCategoryId: [],
      supplierId: [],
      supplierItemCode: [],
      costPriceDiscount: [null, percentValidator],
      costInStore: [null, Validators.required],
      bonAdditionalText: [],
      availableFrom: [],
      availableTo: [],
      unitsInStock: [],
      instructions: [],
      extraItems: []
    });
  }

  setSubCategories(): void {
    if (this.selectedCategoryId) {
      const category = this.categories.find(c => c.id === this.selectedCategoryId);
      this.subCategories = category.subCategories;
    }
  }

  updateStorePrice(): void {
    const customerPrice = this.itemForm.get('customerPrice').value;
    this.itemForm.get('costInStore').patchValue(customerPrice);
  }

  checkCodeExists(code: FormControl): Promise<object> | Observable<any> {
    if (this.item && code.value === this.item.code) {
      return of(null);
    }

    return this.itemService.checkCodeExists(code.value).then(response => response.exists ? response : null);
  }

  submit(): void {
    if (this.itemForm.valid) {
      this.setRelatedValues();
      if (this.item) {
        this.itemService.updateItem(this.itemForm.value, this.item.id).then(response => this.handleResponse(response));
      } else {
        this.itemService.newItem(this.itemForm.value).then(response => this.handleResponse(response));
      }
    } else {
      this.helpers.scrollToError(this.el);
    }
  }

  setRelatedValues(): void {
    this.itemForm.get('instructions').patchValue(this.instructionsComponent.selectedInstructions);
    this.itemForm.get('customerPrices').patchValue(this.customerPricesComponent.prices.value);
    this.itemForm.get('subItems').patchValue(this.subItemsComponent.items.value);
    this.itemForm.get('extraItems').patchValue(this.extraItemsComponent.items.value);
  }

  private handleResponse(response) {
    if (response) {
      this.notification.success();
      this.router.navigate(['/items']);
    }
  }
}

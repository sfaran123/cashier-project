import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CategoryService } from 'src/app/shared/_services/http/category.service';

import { CategoryModel } from 'src/app/shared/_models/category.model';
import { ErrorMessages } from 'src/app/shared/_consts/error-messages';
import { Plus, Trash } from 'src/app/shared/_consts/img-paths';


@Component({
  selector: 'app-category-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  readonly plus = Plus;

  readonly trash = Trash;

  category: CategoryModel;

  errorMessages = ErrorMessages;

  form: FormGroup = this.fb.group({
    name: [],
    number: [],
    subCategories: this.fb.array([])
  });

  constructor(private fb: FormBuilder, private categoryService: CategoryService,
              private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.category = this.route.snapshot.data.category;

    if (this.category) {
      this.setFormData();
    }
  }

  get subCategories(): FormArray {
    return this.form.get('subCategories') as FormArray;
  }

  setFormData(): void {
    this.category.subCategories.forEach(() => {
      this.addSubCategory();
    });

    this.form.patchValue(this.category);
  }

  addSubCategory(): void {
    this.subCategories.push(this.newSubCategory());
  }

  newSubCategory(): FormGroup {
    return this.fb.group({
      name: this.fb.control(null, Validators.required),
      number: this.fb.control(null, Validators.required),
    });
  }

  removeSubCategory(index: number): void {
    this.subCategories.removeAt(index);
  }

  submit(): void {
    if (this.form.valid) {
      if (this.category) {
        this.categoryService.updateCategory(this.form.value, this.category.id).then(response => this.handleResponse(response));
      } else {
        this.categoryService.newCategory(this.form.value).then(response => this.handleResponse(response));
      }
    }
  }

  private handleResponse(response): void {
    if (response) {
      this.router.navigate(['/items', 'categories']);
    }
  }
}

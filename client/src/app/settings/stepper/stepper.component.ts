import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.styl']
})
export class StepperComponent implements OnInit {

  posForm: FormGroup;
  total: number;

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.posForm = this.fb.group({
      number1: [ null, Validators.required],
      number2: [null, Validators.required]
  });
  }


  submit() {
    this.total = this.posForm.value.number1 * this.posForm.value.number2;
  }
}

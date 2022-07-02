import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html'
})
export class ErrorsComponent implements OnInit {

  errors: any[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.errors = this.data;
  }
}

import { Component, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';

import { FormDialogComponent } from 'src/app/items/instructions/form-dialog/form-dialog.component';
import { DataTableComponent } from 'src/app/shared/_components/data-table/data-table.component';

import { InstructionsService } from 'src/app/shared/_services/http/instructions.service';

import { InstructionModel } from 'src/app/shared/_models/instruction.model';


@Component({
  selector: 'app-instruction',
  templateUrl: './instructions.component.html',
  styles: [`.h25-p { height: 25px }`]
})
export class InstructionsComponent implements OnDestroy {

  @ViewChild(DataTableComponent, { static: true }) dataTable: DataTableComponent;

  readonly columns = [
    { name: 'name', label: 'NAME' }, { name: 'color', label: 'COLOR' },
    { name: 'isDefault', label: 'IS_DEFAULT' }
  ];

  instructions: InstructionModel[] = [];

  sub = new Subscription();

  constructor(private dialog: MatDialog, private instructionService: InstructionsService) {}

  fetchItems(): void {
    this.instructionService.getInstructions(this.dataTable.criteria).then(response => this.dataTable.setItems(response));
  }

  openDialog(instruction?: InstructionModel): void {
    const dialog = this.dialog.open(FormDialogComponent, {
      data: { instruction },
      width: '400px'
    });

    this.sub.add(dialog.afterClosed().subscribe(result =>  result ? this.fetchItems() : null));
  }

  deleteInstruction(instructionId: number): void {
    this.instructionService.deleteInstruction(instructionId).then(() => this.fetchItems());
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}

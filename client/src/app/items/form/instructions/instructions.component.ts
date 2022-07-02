import { Component, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { InstructionModel } from 'src/app/shared/_models/instruction.model';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styles: [`.color-stripe { height: 15px; width: 100% }`]
})
export class InstructionsComponent {

  @Input() instructions: InstructionModel[];

  @Input() selectedInstructions: InstructionModel[] = [];

  selectedInstruction: InstructionModel;

  dropInstruction(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.selectedInstructions, event.previousIndex, event.currentIndex);
  }

  addInstruction(): void {
    if (this.selectedInstruction) {
      const exists = this.selectedInstructions.find(instruction => instruction.id === this.selectedInstruction.id);

      if (!exists) {
        this.selectedInstructions.push(this.selectedInstruction);
        this.selectedInstruction = null;
      }
    }
  }

  deleteInstruction(instructionIndex: number): void {
    this.selectedInstructions.splice(instructionIndex, 1);
  }
}

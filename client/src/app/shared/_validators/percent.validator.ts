import { AbstractControl } from '@angular/forms';

export function percentValidator(control: AbstractControl): any {

  if (!control.value) {
    return null;
  }

  return (control.value > 100 || control.value < 0) ? { percent: true } : null;
}


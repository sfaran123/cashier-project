import { Subject } from 'rxjs';
import { ElementRef, Injectable } from '@angular/core';

@Injectable()
export class HelpersService {
  pageSpinnerShown: Subject<boolean> = new Subject();
  urlChanged: Subject<string> = new Subject();

  setPageSpinner(isShown: boolean): void {
    setTimeout(() => this.pageSpinnerShown.next(isShown), 0);
  }

  scrollToError(el: ElementRef): void {
    const firstInvalidControl: HTMLElement = el.nativeElement.querySelector('input.ng-invalid');

    firstInvalidControl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

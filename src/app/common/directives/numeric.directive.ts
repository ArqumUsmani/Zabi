import { Directive, HostListener } from '@angular/core';
import { NgModel } from '@angular/forms';

@Directive({
  selector: '[appNumeric]'
})
export class NumericDirective {
  constructor(private ngModel: NgModel) {}

  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    // Allow: backspace, delete, tab, escape, enter, and numbers
    if (
      event.key === 'Backspace' ||
      event.key === 'Tab' ||
      event.key === 'Escape' ||
      event.key === 'Enter' ||
      (event.key >= '0' && event.key <= '9')
    ) {
      return;
    }
    // Prevent default if the key is not a number
    event.preventDefault();
  }
}
import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-otp-input',
  templateUrl: './otp-input.component.html',
  styleUrls: ['./otp-input.component.scss']
})
export class OtpInputComponent{
  inputValues: string[] = ['', '', '', ''];

  // Handle input change and auto-focus the next input
  onInputChange(index: number, nextInput?: HTMLInputElement) {
    const currentValue: any = this.inputValues[index - 1]; // Get the current input value

    // If current input is filled and there is a next input, focus the next one
    if (currentValue && nextInput) {
      nextInput.focus();
    }
  }

  getOtpValue(): string {
    return this.inputValues.join('');
  }
}

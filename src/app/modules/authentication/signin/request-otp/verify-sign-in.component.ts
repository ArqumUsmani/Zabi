import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { SignInOptions } from 'src/app/common/constants/enums';
import { AuthenticationService } from '../../../../common/services/authentication.service';
import { OtpRequest } from 'src/app/common/models/otpRequest';
import { PhoneDropdownComponent } from '../../shared/phone-dropdown/phone-dropdown.component';

@Component({
  selector: 'app-request-otp',
  templateUrl: './verify-sign-in.component.html',
  styleUrls: ['./verify-sign-in.component.scss']
})

export class VerifySignInComponent {
  signInOptions = SignInOptions;
  email: string = '';
  countryCode: string = '+1';
  phone: string = '';
  @Input() signInOption: string | undefined;
  @Output() sendTokenConfirmationReq = new EventEmitter();
  @ViewChild(PhoneDropdownComponent) phoneDropdownComponent!: PhoneDropdownComponent;

  constructor(private authenticationService: AuthenticationService) { }

  sendVerificationCode(otpRequestSignup?: OtpRequest) {
    let otpRequest: OtpRequest = {} as OtpRequest
    if(otpRequestSignup) {
      otpRequest = otpRequestSignup
    } else {
      if (this.email) {
        otpRequest.type = this.signInOptions.EMAIL
        otpRequest.email = this.email
      }
      else if (this.phoneDropdownComponent.phone) {
        otpRequest.type = this.signInOptions.PHONE
        otpRequest.phone = this.phoneDropdownComponent.phone
      }
    }
    this.authenticationService.requestOtp(otpRequest).subscribe({
      next: (response) => {
        this.sendTokenConfirmationReq.emit(otpRequest)
      },
      error: (error) => {

      }
    })
  }
}

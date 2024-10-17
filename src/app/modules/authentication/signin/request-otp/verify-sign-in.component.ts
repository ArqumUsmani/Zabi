import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SignInOptions } from 'src/app/common/constants/enums';
import { AuthenticationService } from '../../../../common/services/authentication.service';
import { OtpRequest } from 'src/app/common/models/otpRequest';
import { countryCodes } from 'src/app/common/constants/countryCodes';

interface Country {
  name: string;
  code: string;
}

@Component({
  selector: 'app-request-otp',
  templateUrl: './verify-sign-in.component.html',
  styleUrls: ['./verify-sign-in.component.scss']
})

export class VerifySignInComponent {
  signInOptions = SignInOptions;
  countryCodes = countryCodes;
  email: string = '';
  countryCode: string = '+1';
  phone: string = '';
  @Input() signInOption: string | undefined;
  @Output() sendTokenConfirmationReq = new EventEmitter();
  countries: Country[] =[];
  selectedCountry!: Country;
  constructor(private authenticationService: AuthenticationService) { }
  ngOnInit(){
    this.countries = [
      { name: 'United States', code: 'US' },
      { name: 'Canada', code: 'CA' },
      { name: 'United Kingdom', code: 'UK' },
      { name: 'Pakistan', code: 'PK' },
      { name: 'India', code: 'IN' }
  ];
  }
  sendVerificationCode(otpRequestSignup?: OtpRequest) {
    let otpRequest: OtpRequest = {} as OtpRequest
    if(otpRequestSignup) {
      otpRequest = otpRequestSignup
    } else {
      if (this.email) {
        otpRequest.type = this.signInOptions.EMAIL
        otpRequest.email = this.email
      }
      else if (this.phone) {
        otpRequest.type = this.signInOptions.PHONE
        otpRequest.phone = this.countryCode + this.phone
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

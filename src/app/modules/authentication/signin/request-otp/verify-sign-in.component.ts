import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SignInOptions } from 'src/app/common/constants/enums';
import { AuthenticationService } from '../../authentication.service';
import { OtpRequest } from 'src/app/common/models/otpRequest';

@Component({
  selector: 'app-request-otp',
  templateUrl: './verify-sign-in.component.html',
  styleUrls: ['./verify-sign-in.component.scss']
})

export class VerifySignInComponent {
  signInOptions = SignInOptions;
  email: string = '';
  phone: string = '';
  @Input() signInOption: string | null = null;
  @Output() sendTokenConfirmationReq = new EventEmitter();

  constructor(private authenticationService: AuthenticationService) { }

  sendVerificationCode() {
    const otpRequest: OtpRequest = {} as OtpRequest
    if (this.email) {
      otpRequest.type = this.signInOptions.EMAIL
      otpRequest.email = this.email
    }
    else if (this.phone) {
      otpRequest.type = this.signInOptions.PHONE
      otpRequest.phone = this.phone
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

import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AuthenticationService } from '../../../../common/services/authentication.service';
import { UserService } from '../../../../common/services/user.service';
import { OtpInputComponent } from '../otp-input/otp-input.component';
import { defaultUser, User } from 'src/app/common/models/user';
import { Utils } from 'src/app/common/Helper/utility';
import { OtpRequest } from 'src/app/common/models/otpRequest';
import { SignInOptions } from 'src/app/common/constants/enums';
import { ToastService } from 'src/app/common/services/toast.service';
import { localStorageKeys } from 'src/app/common/constants/constants';
import { CommonPubSubService } from 'src/app/common/Helper/common-pub-sub.service';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.scss']
})
export class VerifyOtpComponent implements OnInit {
  timer: number = 60;  // Initial countdown time (in seconds)
  resendDisabled: boolean = true;  // Disable resend button initially
  interval: any;  // Variable to store the interval for countdown
  signInOptions = SignInOptions;
  _otpRequest: OtpRequest | undefined;
  @Input()
  set otpRequest(value: OtpRequest | undefined) {
    this._otpRequest = value;
  }

  @Output() sendUserData = new EventEmitter();
  @Output() triggerResendOtp = new EventEmitter();
  @ViewChild(OtpInputComponent) otpInputComponent!: OtpInputComponent;

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private toastService: ToastService,
    private commonPubService: CommonPubSubService
  ) { }

  ngOnInit() {
    this.startTimer();
  }

  startTimer() {
    this.resendDisabled = true;
    this.timer = 60;  // Reset the timer to 60 seconds

    // Clear any existing interval
    if (this.interval) {
      clearInterval(this.interval);
    }

    // Start a new interval
    this.interval = setInterval(() => {
      this.timer--;

      // When the timer reaches 0, enable the resend button
      if (this.timer === 0) {
        this.resendDisabled = false;
        clearInterval(this.interval);
      }
    }, 1000);  // Run every second
  }

  resendOtp() {
    this.otpInputComponent.inputValues = ['', '', '', ''];
    this.triggerResendOtp.emit(this._otpRequest)
    this.startTimer();
  }

  getContinueBtnDisableState() {
    if (!this.otpInputComponent?.getOtpValue() || this.otpInputComponent?.getOtpValue()?.length !== 4)
      return true
    else
      return false
  }

  verifyOtp() {
    this.authenticationService.verifytOtp({ code: this.otpInputComponent.getOtpValue(), 
      createJwt: localStorage.getItem(localStorageKeys.accessToken) ? false : true }).subscribe({
      next: (response) => {
        if(response && response?.token)
          localStorage.setItem(localStorageKeys.accessToken, response.token);
        this.getUser()
      },
      error: (error) => {
        if(error.title === 'OtpNotFoundException')
          this.toastService.showError('Invalid OTP')
        else if(error.title === 'PhoneAlreadyExistsException')
          this.toastService.showError('Phone Number already exists')
        else
          this.toastService.showError('Server Error')
      }
    })
  }

  private getUser() {
    this.userService.getUser().subscribe({
      next: (response: User) => {
        if (response) {
          this.sendUserData.emit(Utils.applyDefaults<User>(response, defaultUser))
          this.commonPubService.setUserInfo(Utils.applyDefaults<User>(response, defaultUser))
          localStorage.setItem(localStorageKeys.user, JSON.stringify(response))
        }
      },
      error: (error) => {

      }
    })
  }
}

import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AuthenticationService } from '../../authentication.service';
import { UserService } from '../../user.service';
import { OtpInputComponent } from '../otp-input/otp-input.component';
import { defaultUser, User } from 'src/app/common/models/user';
import { Utils } from 'src/app/common/Helper/utility';
import { OtpRequest } from 'src/app/common/models/otpRequest';
import { SignInOptions } from 'src/app/common/constants/enums';

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
  @Input() otpRequest: OtpRequest | null = null;
  @Output() sendUserData = new EventEmitter();
  @Output() triggerResendOtp = new EventEmitter();
  @ViewChild(OtpInputComponent) otpInputComponent!: OtpInputComponent;

  constructor(private authenticationService: AuthenticationService,
    private userService: UserService
  ) {

  }

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
    this.triggerResendOtp.emit(this.otpRequest)
    this.startTimer();
  }

  getContinueBtnDisableState() {
    console.log(this.otpInputComponent?.getOtpValue()?.length)
    if (!this.otpInputComponent?.getOtpValue() || this.otpInputComponent?.getOtpValue()?.length !== 4)
      return true
    else
      return false
  }

  verifyOtp() {
    this.authenticationService.verifytOtp({ code: this.otpInputComponent.getOtpValue(), createJwt: true }).subscribe({
      next: (response) => {
        if (response) {
          localStorage.setItem('accessToken', response.token);
          this.getUser()
        }
      },
      error: (error) => {

      }
    })
  }

  private getUser() {
    this.userService.getUser().subscribe({
      next: (response: User) => {
        if (response) {
          this.sendUserData.emit(Utils.applyDefaults<User>(response, defaultUser))
        }
      },
      error: (error) => {

      }
    })
  }
}

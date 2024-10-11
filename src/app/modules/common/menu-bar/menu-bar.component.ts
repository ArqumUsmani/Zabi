import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { FilterMatchMode, MenuItem, PrimeNGConfig } from 'primeng/api';
import { SignInOptions } from 'src/app/common/constants/enums';
import { OtpRequest } from 'src/app/common/models/otpRequest';
import { User } from 'src/app/common/models/user';
import { VerifySignInComponent } from '../../authentication/signin/request-otp/verify-sign-in.component';
import { SignupComponent } from '../../authentication/signup/signup.component';
import { ToastService } from 'src/app/common/services/toast.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MenuBarComponent {
  title = 'Zabihah';
  email: string = '';
  phoneNumber: string = '';
  items: MenuItem[] = [];
  signInOption: string = '';
  otpRequest: OtpRequest | undefined;
  user: User | undefined;
  signInDialog: boolean = false;
  getOtpDialog: boolean = false;
  signUpDialog: boolean = false;
  verifyOtpDialog: boolean = false;
  @ViewChild(VerifySignInComponent) requestOtpComponent!: VerifySignInComponent;
  @ViewChild(SignupComponent) signupComponent!: SignupComponent;

  constructor(private primengConfig: PrimeNGConfig, private toastService: ToastService) { }

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.primengConfig.zIndex = {
      modal: 1100, // dialog, sidebar
      overlay: 1000, // dropdown, overlaypanel
      menu: 1000, // overlay menus
      tooltip: 1100, // tooltip
    };
    this.primengConfig.filterMatchModeOptions = {
      text: [
        FilterMatchMode.STARTS_WITH,
        FilterMatchMode.CONTAINS,
        FilterMatchMode.NOT_CONTAINS,
        FilterMatchMode.ENDS_WITH,
        FilterMatchMode.EQUALS,
        FilterMatchMode.NOT_EQUALS,
      ],
      numeric: [
        FilterMatchMode.EQUALS,
        FilterMatchMode.NOT_EQUALS,
        FilterMatchMode.LESS_THAN,
        FilterMatchMode.LESS_THAN_OR_EQUAL_TO,
        FilterMatchMode.GREATER_THAN,
        FilterMatchMode.GREATER_THAN_OR_EQUAL_TO,
      ],
      date: [
        FilterMatchMode.DATE_IS,
        FilterMatchMode.DATE_IS_NOT,
        FilterMatchMode.DATE_BEFORE,
        FilterMatchMode.DATE_AFTER,
      ],
    };

    this.items = [
      {
        label: 'Home',
        icon: 'home',
        routerLink: 'home',
      },
      {
        label: 'Find hilal food',
        icon: 'hilalFood',
        routerLink: 'hilal-food',
      },
      {
        label: 'Pickup & delivery',
        icon: 'pickup',
        routerLink: 'pickup-and-delivery',
      },
      {
        label: 'Prayer spaces',
        icon: 'prayer',
        routerLink: 'prayer-spaces',
      },
    ];
  }

  showSignInDialog() {
    this.signInDialog = true;
  }

  onDialogClose() {
    this.email = '';
    this.phoneNumber = '';
  }

  setSignInOption(event: string) {
    this.signInDialog = false;
    this.getOtpDialog = true;
    this.signInOption = event;
  }

  getTokenConfirmationReq(event: OtpRequest) {
    this.getOtpDialog = false;
    this.verifyOtpDialog = true;
    this.otpRequest = event;
  }

  getUserData(userData: User) {
    this.user = userData;
    this.verifyOtpDialog = false;
    if (!userData.isPhoneVerified || !userData.isEmailVerified || !userData.firstName)
      this.signUpDialog = true;
    else if (userData.isPhoneVerified && userData.isEmailVerified && !userData.firstName)
     this.signupComponent.updateUser(this.user)
  }

  getResendOtpEvent(event: OtpRequest){
    if(this.otpRequest)
      this.requestOtpComponent?.sendVerificationCode(this.otpRequest)
    else
      this.requestOtpComponent?.sendVerificationCode()
  }

  getRequestOptEvent(event: {signinOption: string, userData: User}) {
    this.signUpDialog = false;
    this.user = event.userData;
    this.signInOption
    this.otpRequest = {
      type: event.signinOption,
    };
    if(event.signinOption === SignInOptions.EMAIL) 
      this.otpRequest.email = event.userData.email
    if(event.signinOption === SignInOptions.PHONE) 
      this.otpRequest.phone = event.userData.phone
    this.verifyOtpDialog = true;
    this.requestOtpComponent?.sendVerificationCode(this.otpRequest)
  }
}

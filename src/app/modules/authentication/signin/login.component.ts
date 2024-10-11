import { Component, ViewEncapsulation, EventEmitter, Output } from '@angular/core';
import { SignInOptions } from 'src/app/common/constants/enums';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {
  signInOptions = SignInOptions;
  email: string = '';
  phone: string = '';
  signInOption: string | null = null;
  @Output() sendSignInOption = new EventEmitter();
  @Output() triggerOpenSignUp = new EventEmitter();

  sendVerificationCode() {

  }

  onDialogClose() {
    this.email = '';
    this.phone = '';
  }
}

import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from 'src/app/common/models/user';
import { OtpRequest } from 'src/app/common/models/otpRequest';
import { VerifySignInComponent } from '../signin/request-otp/verify-sign-in.component';
import { SignInOptions } from 'src/app/common/constants/enums';
import { ToastService } from 'src/app/common/services/toast.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  userForm: FormGroup | undefined;
  _userData: User | undefined;
  selectedFile: File | null = null;
  filePreview: string | ArrayBuffer | null = null;
  isImageFile: boolean = false;
  @Output() triggerRequestOptEvent = new EventEmitter();
  @ViewChild(VerifySignInComponent) requestOtpComponent!: VerifySignInComponent;

  @Input()
  set userData(value: User | undefined) {
    this._userData = value;
  }

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      firstName: [this._userData?.firstName ?? '', Validators.required],
      lastName: [this._userData?.lastName ?? '', Validators.required],
      phone: [this._userData?.phone ??  ''],
      email: [this._userData?.email ?? ''],
      isSubscribedToHalalOffersNotification: [this._userData?.isSubscribedToHalalOffersNotification ?? false],
      isSubscribedToHalalEventsNewsletter: [this._userData?.isSubscribedToHalalEventsNewsletter ?? false],
      termsAndConditions: [false, Validators.required]
    });
  }

  onSubmit() {
    if (this.userForm?.valid && this.userForm.get('termsAndConditions')?.value) {
      if (!this._userData?.isEmailVerified && this.userForm?.value.email)
        this.triggerRequestOptEvent.emit({signinOption: SignInOptions.EMAIL, userData: this.userForm?.value})
      else if (!this._userData?.isPhoneVerified && this.userForm?.value.phone)
        this.triggerRequestOptEvent.emit({signinOption: SignInOptions.PHONE, userData: this.userForm?.value})
      else
        this.updateUser(this.userForm.value)
    } else {
      console.log('Form is invalid');
    }
  }

  updateUser(user: User) {
    this.userService.updateUser(this.userForm?.value as User).subscribe({
      next: (response) => {
        this.toastService.showSuccess('Profile created successfully')
      },
      error: (error) => {
        this.toastService.showError('Error creating user profile')
      }
    })
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.isImageFile = file.type.startsWith('image/');

      const reader = new FileReader();

      // Check if the file is an image
      if (this.isImageFile) {
        reader.readAsDataURL(file);
      } else {
        reader.readAsText(file);
      }

      reader.onload = () => {
        this.filePreview = reader.result;
      };

      reader.onerror = (error) => {
        console.error('Error reading file:', error);
      };
    }
  }
}


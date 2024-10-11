import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from 'src/app/common/models/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  userForm: FormGroup | any;
  _userData: User | undefined;

  @Input()
  set userData(value: User) {
    this._userData = value;
  }

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: [''],
      email: [''],
      termsAndConditions: [true, Validators.required]
    });
  }

  onSubmit() {
    if (this.userForm?.valid && this.userForm.get('termsAndConditions')?.value) {
      this.updateUser(this.userForm.value)
    } else {
      console.log('Form is invalid');
    }
  }

  updateUser(user: any) {
    this.userService.updateUser(user).subscribe({
      next: (response) => {

      },
      error: (error) => {

      }
    })
  }

  requestOtp() {

  }
}

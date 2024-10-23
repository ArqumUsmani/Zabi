import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { errorMessages } from 'src/app/common/constants/constants';
import { AddressLabel } from 'src/app/common/constants/enums';
import { ToastService } from 'src/app/common/services/toast.service';
import { UserService } from 'src/app/common/services/user.service';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss']
})
export class AddAddressComponent {

  addressForm: FormGroup | undefined;
  addressLabel = AddressLabel;
  @Output() triggerCloseDialog = new EventEmitter();

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private toastService: ToastService) {
    this.initForm()
  }

  initForm() {
    this.addressForm = this.fb.group({
      name: ['string'],
      physicalAddress: ['', Validators.required],
      locationInstructions: [''],
      deliveryInstructions: [''],
      latitude: [0],
      longitude: [0],
      label: [AddressLabel.HOME],
      isDefault: [true]
    })
  }

  onSubmit() {
    this.userService.addAddress(this.addressForm?.value).subscribe({
      next: (response) => {
        this.triggerCloseDialog.emit(true)
      },
      error: (error) => {
        this.toastService.showError(errorMessages.ADDING_ADDRESS);
        console.error(`${errorMessages.ADDING_ADDRESS}: `, error)
      }
    })
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { errorMessages } from 'src/app/common/constants/constants';
import { AddressLabel } from 'src/app/common/constants/enums';
import { Address } from 'src/app/common/models/address';
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
  _addressDetails: Address | undefined;
  @Input()
  set addressDetails(value: Address | undefined) {
    this._addressDetails = value;
    this.initForm(value);
  }
  @Output() triggerCloseDialog = new EventEmitter();

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private toastService: ToastService) {
    this.initForm()
  }

  initForm(address: Address | null = null) {
    this.addressForm = this.fb.group({
      id: [address?.id ?? null],
      name: [address?.name ?? 'string'],
      physicalAddress: [address?.physicalAddress ?? '', Validators.required],
      locationInstructions: [address?.locationInstructions ?? ''],
      deliveryInstructions: [address?.deliveryInstructions ?? ''],
      latitude: [address?.latitude ?? 0],
      longitude: [address?.longitude ?? 0],
      label: [address?.label ?? AddressLabel.HOME],
      isDefault: [address?.isDefault ?? true]
    })
  }

  onSubmit() {
    if (this._addressDetails)
      this.updateAddress()
    else
      this.addAddress()
  }

  addAddress() {
    const address = this.addressForm?.value;
    delete address.id
    this.userService.addAddress(address).subscribe({
      next: (response) => {
        this.triggerCloseDialog.emit(true)
      },
      error: (error) => {
        this.toastService.showError(errorMessages.ADDING_ADDRESS);
        console.error(`${errorMessages.ADDING_ADDRESS}: `, error)
      }
    })
  }

  updateAddress() {
    this.userService.updateAddress(this.addressForm?.value).subscribe({
      next: (response) => {
        this.triggerCloseDialog.emit(true)
      },
      error: (error) => {
        this.toastService.showError(errorMessages.ADDING_ADDRESS);
        console.error(`${errorMessages.ADDING_ADDRESS}: `, error)
      }
    })
  }

  getAddress(address: string) {
    this.addressForm?.get('physicalAddress')?.setValue(address)
  }
}

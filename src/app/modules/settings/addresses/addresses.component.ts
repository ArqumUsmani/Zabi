import { Component, OnInit } from '@angular/core';
import { errorMessages, localStorageKeys } from 'src/app/common/constants/constants';
import { Address } from 'src/app/common/models/address';
import { ToastService } from 'src/app/common/services/toast.service';
import { UserService } from 'src/app/common/services/user.service';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss']
})
export class AddressesComponent implements OnInit {
  openAddAddressForm: boolean = false;
  addressesList: Address[] = [] as Address[];
  constructor(private userService: UserService, private toastServicec: ToastService) {}

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo() {
    this.userService.getUser().subscribe({
      next: (response) => {
        this.addressesList= response?.addresses;
        localStorage.setItem(localStorageKeys.user, JSON.stringify(response));
      },
      error: (error) => {
        this.toastServicec.showError(errorMessages.GET_ADDRESSES);
        console.error(`${errorMessages.GET_ADDRESSES}: `, error);
      }
    })
  }

  getCloseDialogTrigger() {
    this.openAddAddressForm = false;
  }

  editAddress(address: Address) {

  }

  DeleteAddress(address: Address) {

  }
}

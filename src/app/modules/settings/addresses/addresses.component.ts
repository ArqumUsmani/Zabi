import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
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
  addressDetails: Address | undefined;
  constructor(private userService: UserService, private toastServicec: ToastService,
    private confirmationService: ConfirmationService, private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo() {
    this.userService.getUser().subscribe({
      next: (response) => {
        this.addressesList = response?.addresses;
        localStorage.setItem(localStorageKeys.user, JSON.stringify(response));
      },
      error: (error) => {
        this.toastServicec.showError(errorMessages.GET_ADDRESSES);
        console.error(`${errorMessages.GET_ADDRESSES}: `, error);
      }
    })
  }

  getCloseDialogTrigger() {
    this.getUserInfo()
    this.openAddAddressForm = false;
  }

  editAddress(address: Address) {
   this.addressDetails = address;
   this.openAddAddressForm = true;
  }

  OpenAddressdeletionConfirmDialog(address: Address, index: number) {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete "${address.label}" address from addresses?`,
      header: 'Delete my address',
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptIcon: "none",
      rejectIcon: "none",
      accept: () => {
        this.deleteAddress(address.id, index)
      },
      reject: () => {
        this.confirmationService.close()
      }
    });
  }

  deleteAddress(id: string | undefined, index: number) {
    this.userService.deleteAddress(id).subscribe({
      next: (response) => {
        this.addressesList.splice(index, 1)
      },
      error: (error) => {
        this.toastServicec.showError(errorMessages.DELETE_ADDRESS);
        console.error(`${errorMessages.DELETE_ADDRESS}: `, error)
      }
    })
  }
}

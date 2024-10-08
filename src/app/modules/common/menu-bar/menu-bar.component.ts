import { Component, ViewEncapsulation } from '@angular/core';
import { FilterMatchMode, MenuItem, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MenuBarComponent {
  title = 'Zabihah';
  constructor(private primengConfig: PrimeNGConfig) {}
  items: MenuItem[] = [];
  signInDialog: boolean = false;
  emailSignInDialog: boolean = false;
  confirmPhoneDialog: boolean = false;
  signUpDialog: boolean = false; 
  confirmEmailDialog: boolean = false; 
  signInPhoneDialog: boolean = false; 
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
  showEmailSignInDialog() {
      this.emailSignInDialog = true;
      this.signInDialog = false;
  }
  showConfirmPhoneDialog() {
      this.confirmPhoneDialog = true;
      this.signUpDialog = false;
      this.signInPhoneDialog = false
    this.confirmEmailDialog = false
  }
  showSignUpDialog() {
      this.signUpDialog = true;
  }
  showConfirmEmailDialog(){
    this.emailSignInDialog = false;
    this.confirmEmailDialog = true
  }
  showPhoneSigninDialog(){
    this.signInPhoneDialog = true;
    this.signInDialog = false
  }
}

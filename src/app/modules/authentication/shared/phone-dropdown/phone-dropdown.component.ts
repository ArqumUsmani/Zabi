import { Component } from '@angular/core';
import { countryCodes } from 'src/app/common/constants/countryCodes';
import { Country } from 'src/app/common/constants/interfaces';

@Component({
  selector: 'app-phone-dropdown',
  templateUrl: './phone-dropdown.component.html',
  styleUrls: ['./phone-dropdown.component.scss']
})
export class PhoneDropdownComponent {
  countries: Country[] = countryCodes;
  selectedCountry: Country = countryCodes.find(item  => item.iso2.toLowerCase() === 'us') ?? {} as Country;
  phone: string | undefined = this.selectedCountry.dialCode;

  onCountrySelect(event: any) {
    this.phone = event.value.dialCode;
  }
}

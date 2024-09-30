import { Component, ViewEncapsulation } from '@angular/core';
interface Country {
  name: string,
}
@Component({
  selector: 'app-recently-added',
  templateUrl: './recently-added.component.html',
  styleUrls: ['./recently-added.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class RecentlyAddedComponent {
  countries: Country[] | any;

  selectedCountry: Country | any;
  ngOnInit(){
    this.countries = [
      { name: ''},
      { name: ''},
      { name: ''},
      { name: ''},
  ];
  }
}

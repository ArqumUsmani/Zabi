/// <reference types="@types/googlemaps" />
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { RestaurantService } from 'src/app/common/services/restaurants.service';
import { MosqueService } from 'src/app/common/services/mosque.service';
import { Location } from 'src/app/common/constants/interfaces';
import { CommonPubSubService } from 'src/app/common/Helper/common-pub-sub.service';

@Component({
  selector: 'app-location-filter',
  templateUrl: './location-filter.component.html',
  styleUrls: ['./location-filter.component.scss']
})
export class LocationFilterComponent implements AfterViewInit {
  @ViewChild('searchInput') searchInput!: ElementRef;
  autocomplete!: google.maps.places.Autocomplete;
  selectedPlace: Location = {} as Location;
  keyword: string | undefined;

  constructor(private commonPubSubService: CommonPubSubService) { }

  ngAfterViewInit(): void {
    this.initializeAutocomplete();
  }

  initializeAutocomplete() {
    // Initialize the autocomplete object
    this.autocomplete = new google.maps.places.Autocomplete(this.searchInput.nativeElement, {
      types: ['establishment'], // You can also use 'geocode' or 'address' depending on your use case
    });

    // Listen for place selection
    this.autocomplete.addListener('place_changed', () => {
      const place = this.autocomplete.getPlace();
      if (place.geometry && place.geometry.location) {
        this.selectedPlace = { name: place.name, lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }
      } else {
        console.error("No details available for the input: '" + place.name + "'");
      }
    });
  }

  setLocationFilter(selectedPlace: Location, keyword: string | undefined) {
    this.commonPubSubService.setLocationFilterOpts({ location: selectedPlace, keyword: keyword })
  }
}

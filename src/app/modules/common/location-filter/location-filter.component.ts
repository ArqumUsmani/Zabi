/// <reference types="@types/googlemaps" />
import { Component, OnInit } from '@angular/core';
import { GeolocationService } from '../../../../app/common/services/geolocation.service';
import { PlacesService } from 'src/app/common/services/places.service';
import { HttpService } from 'src/app/common/services/http.service';

@Component({
  selector: 'app-location-filter',
  templateUrl: './location-filter.component.html',
  styleUrls: ['./location-filter.component.scss']
})
export class LocationFilterComponent implements OnInit {

  constructor(private geolocationService: GeolocationService,
    private placesService: PlacesService,
    private httpService: HttpService) { }

  ngOnInit(): void {
    this.initNearbyPlacesService()
  }

  initNearbyPlacesService(): void {
    const service = new google.maps.places.PlacesService(document.createElement('div'));

    const request = {
      location: new google.maps.LatLng(33.6461432,73.0523224), // Replace with actual lat/lng
      radius: 5000, // 5km radius
      type: 'restaurant', // Only get restaurants
    };

    service.nearbySearch(request, (results: any, status: string) => {
      if (status === 'OK' && results) {
        results.forEach((place: any) => {
          console.log(place.name); // List restaurant names in the console
        });
      }
    });
  }

  onKey(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      // this.geolocationService.getPosition().subscribe((coords) => {
      //   this.searchNearbyPlaces(coords.latitude, coords.longitude);
      // });
    }
  }

  findplaces() {
    this.placesService.searchRestaurants({}).subscribe()
  }
}

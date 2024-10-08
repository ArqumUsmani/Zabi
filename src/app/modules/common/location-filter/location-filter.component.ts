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
    this.geolocationService.getPosition().subscribe((coords: any) => {
      this.searchNearbyPlaces(coords.latitude, coords.longitude);
    });
  }

  searchNearbyPlaces(lat: number, lng: number) {
    const radius = 1500; // Search within 1.5 km
    this.placesService.getNearbyPlaces(lat, lng, radius).subscribe((data) => {
      console.log(data.results)
    });
  }

  onKey(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.geolocationService.getPosition().subscribe((coords) => {
        this.searchNearbyPlaces(coords.latitude, coords.longitude);
      });
    }
  }

  findplaces() {
    this.httpService.post('https://zabihahdev1.centralindia.cloudapp.azure.com:81/v1/Restaurant/search', {}).subscribe()
  }
}

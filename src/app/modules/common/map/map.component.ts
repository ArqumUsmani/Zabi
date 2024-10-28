import { Component, OnInit, ViewChild, ElementRef, NgZone, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { GeolocationService } from 'src/app/common/services/geolocation.service';
import { Subscription } from 'rxjs';
import { ToastService } from 'src/app/common/services/toast.service';
import { errorMessages } from 'src/app/common/constants/constants';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {
  lat: number = 40.730610;  // Default latitude (New York)
  lng: number = -73.935242; // Default longitude (New York)
  zoom: number = 12;        // Default zoom level
  address: string = '';

  private geocoder: google.maps.Geocoder | undefined;
  private geoSubscription!: Subscription;

  @ViewChild('search') public searchElementRef!: ElementRef;
  @Output() sendAddress = new EventEmitter();

  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone,
    private geoLocation: GeolocationService, private toastService: ToastService) { }

  ngOnInit(): void {
    this.displayCurrentLocation()
    this.mapsAPILoader.load().then(() => {
      this.geocoder = new google.maps.Geocoder();
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
      });

      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();

          if (place.geometry === undefined || place.geometry === null) {
            return; // Exit if place doesn't have geometry (invalid selection)
          }

          // Update latitude, longitude, and zoom to move the map
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
          this.zoom = 15;  // Adjust zoom level as needed
          this.getAddressFromLatLng(this.lat, this.lng);
        });
      });
    });
  }

  ngOnDestroy(): void {
    if (this.geoSubscription) {
      this.geoSubscription.unsubscribe();
    }
  }

  displayCurrentLocation() {
    this.geoSubscription = this.geoLocation.getCurrentLatLng().subscribe({
      next: (response) => {
        this.lat = response.latitude;
        this.lng = response.longitude;
        this.getAddressFromLatLng(this.lat, this.lng);
      },
      error: (error) => {
        this.getAddressFromLatLng(this.lat, this.lng);
        console.error(error)
      }
    })
  }

  onMarkerDragEnd(event: any) {
    this.lat = event.latLng.lat();
    this.lng = event.latLng.lng();
    this.getAddressFromLatLng(this.lat, this.lng);
  }

  getAddressFromLatLng(lat: number, lng: number): void {
    const latLng = new google.maps.LatLng(lat, lng);
    if (this.geocoder) {
      this.geocoder.geocode({ location: latLng }, (results, status) => {
        if (status === 'OK' && results && results.length > 0) {
          this.address = results[0].formatted_address;
          this.sendAddress.emit(this.address)
        } else {
          console.error('Geocoder failed due to: ' + status);
        }
      });
    }
  }
}

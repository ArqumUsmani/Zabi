import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fallbackImageUrl, logoImageUrl, mosqueImageUrl, defaultCoordinates } from 'src/app/common/constants/constants';
import { Location } from 'src/app/common/constants/interfaces';
import { OrderBy } from 'src/app/common/constants/restaurant.enum';
import { CommonPubSubService } from 'src/app/common/Helper/common-pub-sub.service';
import { GeolocationService } from 'src/app/common/services/geolocation.service';
import { MosqueService } from 'src/app/common/services/mosque.service';

@Component({
  selector: 'app-prayer-spaces',
  templateUrl: './prayer-spaces.component.html',
  styleUrls: ['./prayer-spaces.component.scss']
})
export class PrayerSpacesComponent {
  totalMosques: number | null = null;
  mosques: any = [];
  cusines: any = [];

  //filters
  selectedLocation: Location | undefined;
  keyword: string = '';
  
  constructor(private commonPubSubService: CommonPubSubService,
    private mosqueService: MosqueService,
    private geoLocation: GeolocationService,
  ) {
    //To be triggered when user signs in
    this.commonPubSubService.userInfo$.subscribe({
      next: (user) => {
        if (user) {
          //To be triggered when location filter is selected
          this.commonPubSubService.locationFilterOpts$.subscribe({
            next: (response) => {
              this.getHomeData(response?.location, response?.keyword);
            }
          })
        }
      }
    })
  }

  onMosqueImageError(item: any) {
    item.coverMosqueImageUrl = mosqueImageUrl;
  }

  private getHomeData(location: Location | undefined, keyword: string = '') {
    if (location) {
      //Get location selected in header
      this.getMosques(location, keyword)
      this.getCuisines(location)
    } else {
      //Show data for current location
      this.geoLocation.getCurrentLatLng().subscribe({
        next: (response) => {
          this.getMosques({ latitude: response.latitude, longitude: response.longitude, name: '' })
          this.getCuisines({ latitude: response.latitude, longitude: response.longitude, name: '' })
        },
        error: (error) => {
          //Show data for new york if user has not given location access
          this.getMosques({ latitude: defaultCoordinates.lat, longitude: defaultCoordinates.lng, name: '' })
          this.getCuisines({ latitude: defaultCoordinates.lat, longitude: defaultCoordinates.lng, name: '' })
        }
      })
    }
  }

  private getMosques(selectedPlace: Location | undefined, keyword: string = '', cuisine = null) {
    this.selectedLocation = selectedPlace;
    this.keyword = keyword;
    this.mosqueService.searchMosques(selectedPlace?.latitude, selectedPlace?.longitude, keyword, cuisine).subscribe({
      next: (response) => {
        this.mosques = response?.items;
        this.totalMosques = response.totalRecords;
      },
      error: (error) => {
        console.error('Error getting mosques list')
      }
    })
  }

  private getCuisines(selectedPlace: Location | undefined,) {
    this.mosqueService.searchMosqueCuisines(selectedPlace?.latitude, selectedPlace?.longitude,
      OrderBy.LOCATION).subscribe({
        next: (response) => {
          this.cusines = response;
        },
        error: (error) => {
          console.error('Error getting restaurants cuisines list')
        }
      })
  }
}

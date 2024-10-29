import {Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fallbackImageUrl, logoImageUrl, mosqueImageUrl, defaultCoordinates, defaultPageSize, cuisinePlaceholderImage } from 'src/app/common/constants/constants';
import { Location } from 'src/app/common/constants/interfaces';
import { OrderBy } from 'src/app/common/constants/restaurant.enum';
import { CommonPubSubService } from 'src/app/common/Helper/common-pub-sub.service';
import { GeolocationService } from 'src/app/common/services/geolocation.service';
import { RestaurantService } from 'src/app/common/services/restaurants.service';

@Component({
  selector: 'app-hilal-food',
  templateUrl: './hilal-food.component.html',
  styleUrls: ['./hilal-food.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HilalFoodComponent {
  responsiveOptions: any[] = [];
  totalRestaurants: number | null = null;
  restaurants: any = [];
  cusines: any = [];

  //filters
  selectedLocation: Location | undefined;
  keyword: string = '';

  constructor(private commonPubSubService: CommonPubSubService,
    private restaurantService: RestaurantService,
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

  ngOnInit() {
    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  onCoverImageError(item: any) {
    item.coverImageWebUrl = fallbackImageUrl; // Change to the fallback image if the main image fails to load
  }

  onLogoImageError(item: any) {
    item.iconImageWebUrl = logoImageUrl; // Change to the fallback image if the main image fails to load
  }
  onCuisineImageError(item:any){
    item.iconImageWebUrl = cuisinePlaceholderImage; // Change to the fallback image if the main image fails to load  
  }

  private getHomeData(location: Location | undefined, keyword: string = '') {
    if (location) {
      //Get location selected in header
      this.getRestaurants(location, keyword)
      this.getCuisines(location)
    } else {
      //Show data for current location
      this.geoLocation.getCurrentLatLng().subscribe({
        next: (response) => {
          this.getRestaurants({ latitude: response.latitude, longitude: response.longitude, name: '' })
          this.getCuisines({ latitude: response.latitude, longitude: response.longitude, name: '' })
        },
        error: (error) => {
          //Show data for new york if user has not given location access
          this.getRestaurants({ latitude: defaultCoordinates.lat, longitude: defaultCoordinates.lng, name: '' })
          this.getCuisines({ latitude: defaultCoordinates.lat, longitude: defaultCoordinates.lng, name: '' })
        }
      })
    }
  }

  private getRestaurants(selectedPlace: Location | undefined, keyword: string = '', cuisine = null) {
    this.selectedLocation = selectedPlace;
    this.keyword = keyword;
    this.restaurantService.searchRestaurants(selectedPlace?.latitude, selectedPlace?.longitude, keyword,
      OrderBy.LOCATION, cuisine).subscribe({
        next: (response) => {
          this.restaurants = response.items;
          this.totalRestaurants = response.totalRecords;
        },
        error: (error) => {
          console.error('Error getting restaurants list')
        }
      })
  }

  private getCuisines(selectedPlace: Location | undefined,) {
    this.restaurantService.searchRestaurantCuisines(selectedPlace?.latitude, selectedPlace?.longitude,
      OrderBy.LOCATION).subscribe({
        next: (response) => {
          this.cusines = response;
        },
        error: (error) => {
          console.error('Error getting restaurant cuisines list')
        }
      })
  }
}

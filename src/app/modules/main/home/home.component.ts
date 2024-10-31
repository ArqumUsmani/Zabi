import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { fallbackImageUrl, logoImageUrl, defaultCoordinates } from 'src/app/common/constants/constants';
import { Location } from 'src/app/common/constants/interfaces';
import { OrderBy } from 'src/app/common/constants/restaurant.enum';
import { CommonPubSubService } from 'src/app/common/Helper/common-pub-sub.service';
import { GeolocationService } from 'src/app/common/services/geolocation.service';
import { RestaurantService } from 'src/app/common/services/restaurants.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})

export class HomeComponent {
  responsiveOptions: any[] = [];
  featuredRestaurants: any = [];

  constructor(private commonPubSubService: CommonPubSubService,
    private restaurantService: RestaurantService,
    private geoLocation: GeolocationService,
    private router: Router
  ) {
    //To be triggered when user signs in
    this.commonPubSubService.userInfo$.subscribe({
      next: (user) => {
        if(user) {
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

  navigateToUrl(url: string) {
    this.router.navigateByUrl(url)
  }

  private getHomeData(location: Location | undefined, keyword: string = '') {
    if (location) {
      //Get location selected in header
      this.getFeaturedRestaurants(location, keyword)
    } else {
      //Show data for current location
      this.geoLocation.getCurrentLatLng().subscribe({
        next: (response) => {
          this.getFeaturedRestaurants({latitude: response.latitude, longitude:response.longitude}, keyword)
        },
        error: (error) => {
          //Show data for new york if user has not given location access
          this.getFeaturedRestaurants({latitude: defaultCoordinates.lat, longitude: defaultCoordinates.lng }, keyword)
        }
      })
    }
  }

  private getFeaturedRestaurants(selectedPlace: Location | undefined, keyword: string = '') {
    this.restaurantService.searchRestaurants(selectedPlace?.latitude,  selectedPlace?.longitude,
       keyword, OrderBy.RATING_AND_LOCATION).subscribe({
      next: (response) => {
        this.featuredRestaurants = response.items;
      },
      error: (error) => {
        console.error('Error getting restaurants list')
      }
    })
  }
}

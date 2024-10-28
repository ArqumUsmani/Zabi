import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fallbackImageUrl, logoImageUrl, mosqueImageUrl } from 'src/app/common/constants/constants';
import { Location } from 'src/app/common/constants/interfaces';
import { CommonPubSubService } from 'src/app/common/Helper/common-pub-sub.service';
import { MosqueService } from 'src/app/common/services/mosque.service';
import { RestaurantService } from 'src/app/common/services/restaurants.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent {
  responsiveOptions: any[] = [];
  totalRestaurants: number | null = null;
  restaurants: any = [];
  totalMosques: number | null = null;
  mosques: any = [];

  onCoverImageError(item: any) {
    item.coverImageWebUrl = fallbackImageUrl; // Change to the fallback image if the main image fails to load
  }

  onLogoImageError(item: any) {
    item.iconImageWebUrl = logoImageUrl; // Change to the fallback image if the main image fails to load
  }

  onMosqueImageError(item:any){
    item.coverMosqueImageUrl = mosqueImageUrl;
  }

  constructor(private commonPubSubService: CommonPubSubService,
    private restaurantService: RestaurantService,
    private mosqueService: MosqueService
  ) {
    this.commonPubSubService.locationFilterOpts$.subscribe({
      next: (response) => {
        if (response?.location) {
          this.searchRestaurants(response?.location, response?.keyword)
          this.searchMosques(response?.location, response?.keyword)
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

  searchRestaurants(selectedPlace: Location | undefined, keyword: string | undefined) {
    const payload = {
      keyword: keyword,
      location: {
        latitude: selectedPlace?.lat,
        longitude: selectedPlace?.lng,
      },
    }
    this.restaurantService.searchRestaurants(payload).subscribe({
      next: (response) => {
        this.restaurants = response.items;
        this.totalRestaurants = response.totalRecords;
      },
      error: (error) => {
        console.error('Error getting restaurants list')
      }
    })
  }

  searchMosques(selectedPlace: Location | undefined, keyword: string | undefined) {
    const payload = {
      keyword: keyword,
      location: {
        latitude: selectedPlace?.lat,
        longitude: selectedPlace?.lng,
      },
    }
    this.mosqueService.searchMosques(payload).subscribe({
      next: (response) => {
        this.mosques = response?.items;
        this.totalMosques = response.totalRecords;
      },
      error: (error) => {
        console.error('Error getting mosques list')
      }
    })
  }
}

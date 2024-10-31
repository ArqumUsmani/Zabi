import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { defaultCoordinates, defaultPageSize } from '../constants/constants';
import { Cuisine, Restaurant } from '../constants/interfaces';
import { OrderBy, SortOrder } from '../constants/restaurant.enum';

@Injectable({
    providedIn: 'root',
})
export class RestaurantService {
    private apiKey = environment.googleApiKey;

    constructor(private http: HttpClient) { }

    searchRestaurants(lat: number = defaultCoordinates.lat, lng: number = defaultCoordinates.lng, keyword: string,
        orderBy: string = OrderBy.LOCATION, cuisine: string | null = null, page: number = 0, pageSize: number = defaultPageSize): Observable<any> {
        const payload: Restaurant = {
            keyword: keyword,
            location: {
                latitude: lat,
                longitude: lng,
            },
            page: page,
            pageSize: pageSize,
            sortOrder: SortOrder.DESCENDING,
            orderBy: orderBy,
            cuisine: cuisine,
            excludeRestaurantType: ['Grocery','RestGrocery'],
            parts: ['Cuisines']
        }
        return this.http.post('/Restaurant/search', payload)
    }

    searchRestaurantCuisines(lat: number = defaultCoordinates.lat, lng: number = defaultCoordinates.lng,
        orderBy: string = OrderBy.LOCATION): Observable<any> {
        const payload: Cuisine = {
            placeLocation: {
                latitude: lat,
                longitude: lng,
            },
            sortOrder: SortOrder.DESCENDING,
            orderBy: orderBy
        }
        return this.http.post('/Restaurant/cuisine/search', payload)
    }
}
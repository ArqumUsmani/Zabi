import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { defaultCoordinates, defaultPageSize } from '../constants/constants';
import { OrderBy, SortOrder } from '../constants/restaurant.enum';
import { Cuisine } from '../constants/interfaces';

@Injectable({
    providedIn: 'root',
})
export class MosqueService {
    private apiKey = environment.googleApiKey;

    constructor(private http: HttpClient) { }

    searchMosques(lat: number = defaultCoordinates.lat, lng: number = defaultCoordinates.lng, keyword: string,
        cuisine: string | null = null, page: number = 0, pageSize: number = defaultPageSize): Observable<any> {
        const payload = {
            keyword: keyword,
            location: {
                latitude: lat,
                longitude: lng,
            },
            page: page,
            pageSize: pageSize,
            cuisine: cuisine,
            sortOrder: SortOrder.DESCENDING
        }
        return this.http.post('/Mosque/search', payload)
    }

    searchMosqueCuisines(lat: number = defaultCoordinates.lat, lng: number = defaultCoordinates.lng,
        orderBy: string = OrderBy.LOCATION): Observable<any> {
        const payload: Cuisine = {
            placeLocation: {
                latitude: lat,
                longitude: lng,
            },
            sortOrder: SortOrder.DESCENDING,
            orderBy: orderBy
        }
        return this.http.post('/Mosque/cuisine/search', payload)
    }
}
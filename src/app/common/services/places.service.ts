import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment'; 

@Injectable({
    providedIn: 'root',
})
export class PlacesService {
    private apiKey = environment.googleApiKey;

    constructor(private http: HttpClient) { }

    getNearbyPlaces(lat: number, lng: number, radius: number, keyword: string = ''): Observable<any> {
        const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&keyword=${keyword}&key=${this.apiKey}`;
        return this.http.get(url);
    }

    searchRestaurants(payload: any) {
        return this.http.post('/v1/Restaurant/search', payload)
    }
}
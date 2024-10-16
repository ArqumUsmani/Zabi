import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment'; 

@Injectable({
    providedIn: 'root',
})
export class RestaurantService {
    private apiKey = environment.googleApiKey;

    constructor(private http: HttpClient) { }

    searchRestaurants(payload: any): Observable<any> {
        return this.http.post('/Restaurant/search', payload)
    }
}
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class GeolocationService {
    getCurrentLatLng(): Observable<GeolocationCoordinates> {
        return new Observable((observer) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        observer.next(position.coords);
                        observer.complete(); // Complete the observable once the position is emitted
                    },
                    (error) => {
                        observer.error(error);
                    }
                );
            } else {
                observer.error('Geolocation is not supported by this browser.');
            }
        });
    }
}
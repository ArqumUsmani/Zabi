import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class GeolocationService {
    private positionSubject = new Subject<GeolocationCoordinates>();

    constructor() {
        this.getLocation();
    }

    private getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    this.positionSubject.next(position.coords);
                },
                (error) => {
                    console.error(error);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    }

    getPosition() {
        return this.positionSubject.asObservable();
    }
}
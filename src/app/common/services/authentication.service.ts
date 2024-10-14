import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/common/services/http.service';
import { Endpoints } from '../constants/endpoints';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {

    constructor(private httpService: HttpService) { }

    requestOtp(payload: any): Observable<any> {
        return this.httpService.post(`${Endpoints.USER}/otp/request`, payload)
    }

    verifytOtp(payload: any): Observable<any> {
        return this.httpService.post(`${Endpoints.USER}/otp/verify`, payload)
    }
}
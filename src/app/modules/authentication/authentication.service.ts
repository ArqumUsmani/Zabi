import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/common/services/http.service';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {
    //TO DO: proxy and endpoints file to be made
    api = 'https://zabihahdev1.centralindia.cloudapp.azure.com:81'

    constructor(private httpService: HttpService) { }

    requestOtp(payload: any): Observable<any> {
        return this.httpService.post(this.api + '/v1/User/otp/request', payload)
    }

    verifytOtp(payload: any): Observable<any> {
        return this.httpService.post(this.api + '/v1/User/otp/verify', payload)
    }
}
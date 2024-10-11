import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/common/models/user';
import { HttpService } from 'src/app/common/services/http.service';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    //TO DO: proxy and endpoints file to be made
    api = 'https://zabihahdev1.centralindia.cloudapp.azure.com:81'

    constructor(private httpService: HttpService) { }

    getUser(): Observable<any> {
        return this.httpService.get(this.api + '/v1/User/my')
    }

    updateUser(payload: User): Observable<any> {
        return this.httpService.put(this.api + '/v1/User', payload)
    }

    uploadFile(payload: any): Observable<any> {
        return this.httpService.put(this.api + '/v1/User', payload)
    }
}
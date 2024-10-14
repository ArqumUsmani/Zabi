import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/common/models/user';
import { HttpService } from 'src/app/common/services/http.service';
import { Endpoints } from '../constants/endpoints';

@Injectable({
    providedIn: 'root',
})
export class UserService {

    constructor(private httpService: HttpService) { }

    getUser(): Observable<any> {
        return this.httpService.get(`${Endpoints.USER}/my`)
    }

    updateUser(payload: User): Observable<any> {
        return this.httpService.put(Endpoints.USER, payload)
    }

    uploadFile(payload: any): Observable<any> {
        return this.httpService.put(Endpoints.USER, payload)
    }
}
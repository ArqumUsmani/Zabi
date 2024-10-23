import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/common/models/user';
import { HttpService } from 'src/app/common/services/http.service';
import { Endpoints } from '../constants/endpoints';
import { HttpHeaders } from '@angular/common/http';
import { Address } from '../models/address';

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

    getProfilePictureUploadURI(): Observable<any> {
        return this.httpService.get(Endpoints.USER + '/profile-picture/generate/sas/upload')
    }

    uploadProfilePicture(sasURI: string, image: any): Observable<any> {
        const blob = new Blob([image], { type: image.type });
        let headers = new HttpHeaders()
            .set('Content-Type', image.type)
            .set('x-ms-blob-type', 'Blockblob');
        return this.httpService.put(sasURI, blob, headers)
    }

    addAddress(payload: Address): Observable<any> {
        return this.httpService.post(Endpoints.ADDRESS, payload)
    }
    
    updateAddress(payload: Address): Observable<any> {
        return this.httpService.put(Endpoints.ADDRESS, payload)
    }

    deleteAddress(id: string | undefined): Observable<any> {
        return this.httpService.delete(`${Endpoints.ADDRESS}/${id}`)
    }
}
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserInfo} from '../models/user-info';

@Injectable({
    providedIn: 'root'
})
export class UserInformationService {

    constructor(private http: HttpClient) {
    }

    /***
     * Token header
     * */
    private httpOptions(): HttpHeaders {
        return new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    }


    saveUser(userInfo: UserInfo): Observable<any> {
        return this.http.post('/userInformation', userInfo, {headers: this.httpOptions()});
    }

    saveUserProfile(userInfo: UserInfo): Observable<any> {
        return this.http.post('/userInformation/change', userInfo, {headers: this.httpOptions()});
    }

    findByUserId(userId: number): Observable<any> {
        return this.http.get('/userInformation/user/' + userId, {headers: this.httpOptions()});
    }

    findByUserIdFromList(userId: number): Observable<any> {
        return this.http.get('/userInformation/userList/' + userId, {headers: this.httpOptions()});
    }

    uploadUserPicture(file: File, userId: number): Observable<any> {
        // @ FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
        const uploadImageData = new FormData();
        uploadImageData.append('file', file);

        return this.http.post('/picture/file/upload/' + userId, uploadImageData, {
            reportProgress: true,
            responseType: 'text',
            headers: this.httpOptions()
        });
    }

    uploadUserPictureBackground(file: File, userId: number): Observable<any> {
        // @ FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
        const uploadImageData = new FormData();
        uploadImageData.append('file', file);

        return this.http.post('/pictureBg/file/upload/' + userId, uploadImageData, {
            reportProgress: true,
            responseType: 'text',
            headers: this.httpOptions()
        });
    }

}

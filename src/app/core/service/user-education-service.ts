import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserEducationInfoModel} from '../models/user-education-info-model';

@Injectable({
    providedIn: 'root'
})
export class UserEducationService {

    constructor(private http: HttpClient) {
    }

    /***
     * Token header
     * */
    private httpOptions(): HttpHeaders {
        return new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    }


    getUserEducationInfo(userId: number): Observable<any> {
        return this.http.get('/education/all/' + userId, {headers: this.httpOptions()});
    }

    getById(id: number): Observable<any> {
        return this.http.get('/education/' + id, {headers: this.httpOptions()});
    }

    saveEducation(userEducationInfoModel: UserEducationInfoModel): Observable<any> {
        return this.http.post('/education/save', userEducationInfoModel, {headers: this.httpOptions()});
    }

    deleteEducation(id: number): Observable<any> {
        return this.http.delete('/education/delete/' + id, {headers: this.httpOptions()});
    }

}

import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UniversityInfoModel} from '../models/university-info-model';
import {UniversityModel} from '../models/university-model';

@Injectable({
    providedIn: 'root'
})
export class UniversityInformationService {

    constructor(private http: HttpClient) {
    }

    /***
     * Token header
     * */
    private httpOptions(): HttpHeaders {
        return new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    }


    findByUserIdFromList(userId: number): Observable<any> {
        if (localStorage.getItem('token') !== null) {
            return this.http.get('/university-control/university/info/userList/' + userId, {headers: this.httpOptions()});
        } else {
        }
    }

    saveUniversity(universityInfo: UniversityInfoModel): Observable<any> {
        return this.http.post('/university-control/university/info', universityInfo, {headers: this.httpOptions()});
    }

    saveMainUniversityInfo(universityModel: UniversityModel): Observable<any> {
        return this.http.post('/university-control/university', universityModel, {headers: this.httpOptions()});
    }

    changeInformation(universityInfo: UniversityInfoModel): Observable<any> {
        return this.http.post('/university-control/university/info/change', universityInfo, {headers: this.httpOptions()});
    }

    getInformation(params: string): Observable<any> {
        return this.http.get('/university-control/university/info/all?' + params, {headers: this.httpOptions()});
    }

    findByUserId(userId: number): Observable<any> {
        if (localStorage.getItem('token') !== null) {
            return this.http.get('/university-control/university/info/user/' + userId, {headers: this.httpOptions()});
        } else {
        }
    }

    getInformationById(id: number): Observable<any> {
        return this.http.get('/university-control/university/info/' + id, {headers: this.httpOptions()});
    }

    searchByName(params: string, searchName: string): Observable<any> {
        return this.http.get('/university-control/university/info/search/' + searchName + '?' + params, {headers: this.httpOptions()});
    }

    /***
     * University Page Information
     * */
    getUniversityFullInfo(): Observable<any> {
        return this.http.get('/university-control/university/full/info', {headers: this.httpOptions()});
    }

}

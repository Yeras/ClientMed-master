import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UniversityService {

    constructor(private http: HttpClient) {
    }

    /***
     * Token header
     * */
    private httpOptions(): HttpHeaders {
        return new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    }


    getAllUniversityByCity(cityId: number): Observable<any> {
        return this.http.get('/university/all/' + cityId, {headers: this.httpOptions()});
    }

    getUniversityById(universityId: number): Observable<any> {
        return this.http.get('/university/' + universityId, {headers: this.httpOptions()});
    }

}

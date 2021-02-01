import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CityService {

    constructor(private http: HttpClient) {
    }

    /***
     * Token header
     * */
    private httpOptions(): HttpHeaders {
        return new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    }


    getCityByCountry(countryId: number): Observable<any> {
        return this.http.get('/city/all/' + countryId, {headers: this.httpOptions()});
    }

    getCityById(cityId: number): Observable<any> {
        return this.http.get('/city/' + cityId, {headers: this.httpOptions()});
    }

    getAllCity(): Observable<any> {
        return this.http.get('/city/all', {headers: this.httpOptions()});
    }

}

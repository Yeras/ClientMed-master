import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CountryService {

    constructor(private http: HttpClient) {
    }

    /***
     * Token header
     * */
    private httpOptions(): HttpHeaders {
        return new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    }

    getAllCountry(): Observable<any> {
        return this.http.get('/country/all', {headers: this.httpOptions()});
    }

    getCountryById(countryId: number): Observable<any> {
        return this.http.get('/country/' + countryId, {headers: this.httpOptions()});
    }

}

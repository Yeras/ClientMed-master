import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DegreeService {

    constructor(private http: HttpClient) {
    }

    /***
     * Token header
     * */
    private httpOptions(): HttpHeaders {
        return new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    }

    getAllDegree(): Observable<any>{
        return this.http.get('/degree/all', {headers: this.httpOptions()});
    }

    getDegreeById(degreeId: number): Observable<any>{
        return this.http.get('/degree/' + degreeId, {headers: this.httpOptions()});
    }

}

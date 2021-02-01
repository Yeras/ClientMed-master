import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SpecialtyService {

    constructor(private http: HttpClient) {
    }

    /***
     * Token header
     * */
    private httpOptions(): HttpHeaders {
        return new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    }


    getAllSpecialtyByFaculty(facultyId: number): Observable<any> {
        return this.http.get('/specialty/all/' + facultyId, {headers: this.httpOptions()});
    }

    getSpecialtyById(specialtyId: number): Observable<any> {
        return this.http.get('/specialty/' + specialtyId, {headers: this.httpOptions()});
    }

}

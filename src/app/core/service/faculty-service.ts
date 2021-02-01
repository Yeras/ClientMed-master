import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FacultyService {

    constructor(private http: HttpClient) {
    }

    /***
     * Token header
     * */
    private httpOptions(): HttpHeaders {
        return new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    }


    getAllFaculty(): Observable<any> {
        return this.http.get('/faculty/all', {headers: this.httpOptions()});
    }

    getFacultyById(facultyId: number): Observable<any> {
        return this.http.get('/faculty/' + facultyId, {headers: this.httpOptions()});
    }

}

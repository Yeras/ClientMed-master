import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TeacherAboutThink} from '../models/teacher-about-think';

@Injectable({
    providedIn: 'root'
})
export class TeacherAboutThinkService {

    constructor(private http: HttpClient) {
    }

    /***
     * Token header
     * */
    private httpOptions(): HttpHeaders {
        return new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    }


    saveIncognito(teacherAboutThink: TeacherAboutThink): Observable<any> {
        return this.http.post('/teacher-control/think', teacherAboutThink, {headers: this.httpOptions()});
    }

    saveNoIncognito(teacherAboutThink: TeacherAboutThink): Observable<any> {
        return this.http.post('/teacher-control/think', teacherAboutThink, {headers: this.httpOptions()});
    }

    findAllAbout(params: string, teacherId: number): Observable<any> {
        return this.http.get('/teacher-control/think/all/' + teacherId + '?' + params, {headers: this.httpOptions()});
    }

    findById(id: number): Observable<any> {
        return this.http.get('/teacher-control/think/' + id, {headers: this.httpOptions()});
    }

}

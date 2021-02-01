import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TeacherInfo} from '../models/teacher-info';

@Injectable({
    providedIn: 'root'
})
export class TeacherInformationService {

    constructor(private http: HttpClient) {
    }

    /***
     * Token header
     * */
    private httpOptions(): HttpHeaders {
        return new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    }


    findByUserIdFromList(userId: number): Observable<any> {
        return this.http.get('/teacher-control/teacher/userList/' + userId, {headers: this.httpOptions()});
    }

    findByUserId(userId: number): Observable<any> {
        return this.http.get('/teacher-control/teacher/user/' + userId, {headers: this.httpOptions()});
    }

    saveTeacher(teacherInfo: TeacherInfo): Observable<any> {
        return this.http.post('/teacher-control/teacher', teacherInfo, {headers: this.httpOptions()});
    }

    changeInfoTeacher(teacherInfo: TeacherInfo): Observable<any> {
        return this.http.post('/teacher-control/teacher/change', teacherInfo, {headers: this.httpOptions()});
    }

    changeTeacherInfo(teacherInfo: TeacherInfo): Observable<any> {
        return this.http.post('/teacher-control/teacher/change', teacherInfo, {headers: this.httpOptions()});
    }

}

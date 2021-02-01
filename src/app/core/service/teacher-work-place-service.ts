import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TeacherWorkInfo} from '../models/teacher-work-info';

@Injectable({
    providedIn: 'root'
})
export class TeacherWorkPlaceService {

    constructor(private http: HttpClient) {
    }

    /***
     * Token header
     * */
    private httpOptions(): HttpHeaders {
        return new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    }


    saveToWork(teacherWorkInfo: TeacherWorkInfo): Observable<any> {
        return this.http.post('/teacher-control/work/place/save', teacherWorkInfo, {headers: this.httpOptions()});
    }

    findTeacherByUniversityId(universityId: number, teacherId: number): Observable<any> {
        return this.http.get('/teacher-control/work/place/teacher/' + universityId + '/' + teacherId, {headers: this.httpOptions()});
    }

    removeToRemove(teacherWorkInfo: TeacherWorkInfo): Observable<any> {
        return this.http.post('/teacher-control/work/place/remove', teacherWorkInfo, {headers: this.httpOptions()});
    }

    findAllByUniversityId(params: string, universityId: number): Observable<any> {
        return this.http.get('/teacher-control/work/place/all/' + universityId + '?' + params, {headers: this.httpOptions()});
    }

    findAllTeacherByUniversityId(params: string, universityId: number): Observable<any> {
        return this.http.get('/teacher-control/grade/all/' + universityId + '?' + params, {headers: this.httpOptions()});
    }

    searchTeacher(params: string, universityId: number, searchTeacher: string): Observable<any> {
        return this.http.get('/teacher-control/work/place/search/' + universityId + '/' + searchTeacher + '?' + params, {headers: this.httpOptions()});
    }

    findTeacherWorkPlaceHistoryProfile(teacherId: number): Observable<any> {
        return this.http.get('/teacher-control/work/place/teacher/history/' + teacherId, {headers: this.httpOptions()});
    }

    /***
     * For list of teacher in university profile
     * */
    searchTeacherByName(params: string, universityId: number, searchTeacher: string): Observable<any> {
        return this.http.get('/teacher-control/grade/search/' + universityId + '/' + searchTeacher + '?' + params, {headers: this.httpOptions()});
    }

}

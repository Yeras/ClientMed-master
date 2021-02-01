import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GradeTeacherPoints} from '../models/grade-teacher-points';

@Injectable({
    providedIn: 'root'
})
export class GradeTeacherPointsService {

    constructor(private http: HttpClient) {
    }

    /***
     * Token header
     * */
    private httpOptions(): HttpHeaders {
        return new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    }


    putGrade(gradeTeacherPoints: GradeTeacherPoints): Observable<any> {
        return this.http.post('/teacher-control/grade', gradeTeacherPoints, {headers: this.httpOptions()});
    }

    getTeacherGradeByUser(teacherId: number, userId: number): Observable<any> {
        return this.http.get('/teacher-control/grade/user/' + teacherId + '/' + userId, {headers: this.httpOptions()});
    }

    findTeacherFullGrade(teacherId: number): Observable<any> {
        return this.http.get('/teacher-control/grade/teacher/' + teacherId, {headers: this.httpOptions()});
    }

}

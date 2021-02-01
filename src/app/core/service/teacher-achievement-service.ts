import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TeacherAchievement} from '../models/teacher-achievement';

@Injectable({
    providedIn: 'root'
})
export class TeacherAchievementService {

    constructor(private http: HttpClient) {
    }

    /***
     * Token header
     * */
    private httpOptions(): HttpHeaders {
        return new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    }


    saveAchievement(teacherAchievement: TeacherAchievement): Observable<any> {
        return this.http.post('/teacher-control/control/achievement', teacherAchievement, {headers: this.httpOptions()});
    }

    findAllAchievement(params: string, userId: number): Observable<any> {
        return this.http.get('/teacher-control/control/achievement/all/' + userId + '?' + params, {headers: this.httpOptions()});
    }

    findById(id: number): Observable<any> {
        return this.http.get('/teacher-control/control/achievement/' + id, {headers: this.httpOptions()});
    }

    deleteById(id: number): Observable<any> {
        return this.http.delete('/teacher-control/control/achievement/delete/' + id, {headers: this.httpOptions()});
    }

}

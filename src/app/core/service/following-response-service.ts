import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FollowingResponseService {

    constructor(private http: HttpClient) {
    }

    /***
     * Token header
     * */
    private httpOptions(): HttpHeaders {
        return new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    }


    findAllByToUserId(params: string, toUserId: number): Observable<any> {
        return this.http.get('/following-user/response/all/to/' + toUserId + '?' + params, {headers: this.httpOptions()});
    }

    findAllByFromUserId(params: string, fromUserId: number): Observable<any> {
        return this.http.get('/following-user/response/all/from/' + fromUserId + '?' + params, {headers: this.httpOptions()});
    }

    deleteResponseMessage(fromUserId: number, toUserId: number): Observable<any> {
        return this.http.delete('/following-user/response/' + fromUserId + '/' + toUserId, {headers: this.httpOptions()});
    }

}

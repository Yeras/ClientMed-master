import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FollowingFollowerUserService {

    constructor(private http: HttpClient) {
    }

    /***
     * Token header
     * */
    private httpOptions(): HttpHeaders {
        return new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    }


    findFollowingUser(params: string, userId: number): Observable<any> {
        return this.http.get('/following-user/follower/user/following/' + userId + '?' + params, {headers: this.httpOptions()});
    }

    findFollowerUser(params: string, followedId: number): Observable<any> {
        return this.http.get('/following-user/follower/user/follower/' + followedId + '?' + params, {headers: this.httpOptions()});
    }

    searchFollowerUser(params: string, followedId: number, searchName: string): Observable<any> {
        return this.http.get('/following-user/follower/user/search/follower/' + followedId + '/' + searchName + '?' + params, {headers: this.httpOptions()});
    }

    searchFollowingUser(params: string, userId: number, searchName: string): Observable<any> {
        return this.http.get('/following-user/follower/user/search/following/' + userId + '/' + searchName + '?' + params, {headers: this.httpOptions()});
    }


}

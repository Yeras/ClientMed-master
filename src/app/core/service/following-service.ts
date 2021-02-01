import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FollowingUser} from '../models/following-user';

@Injectable({
    providedIn: 'root'
})
export class FollowingService {

    constructor(private http: HttpClient) {
    }

    /***
     * Token header
     * */
    private httpOptions(): HttpHeaders {
        return new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    }


    saveFollower(followingUser: FollowingUser): Observable<any> {
        return this.http.post('/following-user/follow', followingUser, {headers: this.httpOptions()});
    }

    findFollower(userId: number, followedId: number): Observable<any> {
        return this.http.get('/following-user/follow/info/' + userId + '/' + followedId, {headers: this.httpOptions()});
    }

    deleteFollowing(userId: number, followedId: number): Observable<any> {
        return this.http.delete('/following-user/follow/delete/' + userId + '/' + followedId, {headers: this.httpOptions()});
    }

}

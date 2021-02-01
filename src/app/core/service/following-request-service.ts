import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FollowingRequestUser} from '../models/following-request-user';

@Injectable({
    providedIn: 'root'
})
export class FollowingRequestService {

    constructor(private http: HttpClient) {
    }

    /***
     * Token header
     * */
    private httpOptions(): HttpHeaders {
        return new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    }


    saveFollowingRequest(followingRequestUser: FollowingRequestUser): Observable<any> {
        return this.http.post('/following-user/request', followingRequestUser, {headers: this.httpOptions()});
    }

    findRequestInfo(fromUserId: number, toUserId: number): Observable<any> {
        return this.http.get('/following-user/request/' + fromUserId + '/' + toUserId, {headers: this.httpOptions()});
    }

    acceptUserToFollow(fromUserId: number, toUserId: number): Observable<any> {
        return this.http.get('/following-user/request/accept/' + fromUserId + '/' + toUserId, {headers: this.httpOptions()});
    }

    deleteRequestToFollow(fromUserId: number, toUserId: number): Observable<any> {
        return this.http.get('/following-user/request/delete/' + fromUserId + '/' + toUserId, {headers: this.httpOptions()});
    }

    removeUserToFollow(fromUserId: number, toUserId: number): Observable<any> {
        return this.http.get('/following-user/request/remove/' + fromUserId + '/' + toUserId, {headers: this.httpOptions()});
    }

    /***
     * Only For Teachers request, Request for becoming to university teacher
     * */
    acceptToBecomeUniversityTeacher(fromUserId: number, toUserId: number): Observable<any> {
        return this.http.get('/following-user/request/accept/teacher/' + fromUserId + '/' + toUserId, {headers: this.httpOptions()});
    }

}

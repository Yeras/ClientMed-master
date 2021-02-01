import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class WebChattingNotificationService {

    constructor(private http: HttpClient) {
    }

    /***
     * Token header
     * */
    private httpOptions(): HttpHeaders {
        return new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    }


    findAllByUserId(userId: number): Observable<any> {
        return this.http.get('/user-chatting/notification/chat/all/' + userId, {headers: this.httpOptions()});
    }

    deleteNotificationByUserId(userId: number): Observable<any> {
        return this.http.delete('/user-chatting/notification/delete/' + userId, {headers: this.httpOptions()});
    }

}

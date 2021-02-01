import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class WebChattingUserInformationService {

    constructor(private http: HttpClient) {
    }

    /***
     * Token header
     * */
    private httpOptions(): HttpHeaders {
        return new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    }


    // # User's chat list
    getAllChat(params: string, fromUserId: number): Observable<any> {
        return this.http.get('/user-chatting/chat/all/' + fromUserId + '?' + params, {headers: this.httpOptions()});
    }

    // # User's chatting inside info, full chatting with single user
    getChatInfo(chatId: number): Observable<any> {
        return this.http.get('/user-chatting/chat/info/' + chatId, {headers: this.httpOptions()});
    }

    // # User's chatting inside info, full chatting with single user
    getFullChatting(params: string, chatId: number, userId: number): Observable<any> {
        return this.http.get('/user-chatting/chat/chatting/' + chatId + '/' + userId + '?' + params, {headers: this.httpOptions()});
    }

    // # Delete chat for localUser
    deleteChat(chatId: number, fromUserId: number): Observable<any> {
        return this.http.delete('/user-chatting/chat/delete/' + chatId + '/' + fromUserId, {headers: this.httpOptions()});
    }

}

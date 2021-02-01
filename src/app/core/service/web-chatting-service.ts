import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Message} from '../models/web-message-object';
import {environment} from '../models/web-const-environment';

@Injectable()
export class SocketService {
    // Socket Url
    url: string = environment.url + 'api/socket';

    constructor(private http: HttpClient) {
    }

    /***
     * Token header
     * */
    private httpOptions(): HttpHeaders {
        return new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    }


    post(data: Message): Observable<any> {
        return this.http.post(this.url, data, {headers: this.httpOptions()});
    }

}

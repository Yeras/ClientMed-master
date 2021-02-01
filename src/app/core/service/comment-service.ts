import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CommentPublication} from '../models/comment-publication';
import {CommentReplyPublication} from '../models/comment-reply-publication';

@Injectable({
    providedIn: 'root'
})
export class CommentService {

    constructor(private http: HttpClient) {
    }

    /***
     * Token header
     * */
    private httpOptions(): HttpHeaders {
        return new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    }


    saveComment(comment: CommentPublication): Observable<any> {
        return this.http.post('/publication-control/comment', comment, {headers: this.httpOptions()});
    }

    getCommentByPublication(publicationId: number): Observable<any> {
        return this.http.get('/publication-control/comment/all/' + publicationId, {headers: this.httpOptions()});
    }

    // $ Reply Comment Controller - (another controller)
    saveReplyComment(comment: CommentReplyPublication): Observable<any> {
        return this.http.post('/publication-control/reply', comment, {headers: this.httpOptions()});
    }

    getReplyCommentByComment(commentId: number): Observable<any> {
        return this.http.get('/publication-control/reply/all/' + commentId, {headers: this.httpOptions()});
    }

    countReplyComment(publicationId: number): Observable<any> {
        return this.http.get('/publication-control/reply/count/' + publicationId, {headers: this.httpOptions()});
    }

}

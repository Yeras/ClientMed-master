import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PublicationLikeDislike} from '../models/publication-like-dislike';

@Injectable({
    providedIn: 'root'
})
export class PublicationLikeDislikeService {

    constructor(private http: HttpClient) {
    }

    /***
     * Token header
     * */
    private httpOptions(): HttpHeaders {
        return new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    }


    createLikeDislike(publicationLikeDislike: PublicationLikeDislike): Observable<any> {
        return this.http.post('/publication-control/like', publicationLikeDislike, {headers: this.httpOptions()});
    }

    getLikeDislike(publicationId: number, userId: number): Observable<any> {
        return this.http.get('/publication-control/like/' + publicationId + '/' + userId, {headers: this.httpOptions()});
    }

    getCountLike(publicationId: number): Observable<any> {
        return this.http.get('/publication-control/like/count/like/' + publicationId, {headers: this.httpOptions()});
    }

}

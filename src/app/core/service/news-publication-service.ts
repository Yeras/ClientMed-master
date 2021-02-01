import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {NewsPublication} from '../models/news-publication';

@Injectable({
    providedIn: 'root'
})
export class NewsPublicationService {

    constructor(private http: HttpClient) {
    }

    /***
     * Token header
     * */
    private httpOptions(): HttpHeaders {
        return new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    }


    savePublication(newsPublication: NewsPublication): Observable<any> {
        return this.http.post('/publication-control/publication', newsPublication, {headers: this.httpOptions()});
    }

    uploadPublicationPicture(file: File, publicationId: number): Observable<any> {
        // @ FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
        const uploadImageData = new FormData();
        uploadImageData.append('file', file);

        return this.http.post('/publication-control/publication/picture/' + publicationId, uploadImageData, {
            reportProgress: true,
            responseType: 'text',
            headers: this.httpOptions()
        });
    }

    findAllByUserId(params: string, userId: number): Observable<any> {
        return this.http.get('/publication-control/publication/all/' + userId + '?' + params, {headers: this.httpOptions()});
    }

    findPicture(publicationId: number): Observable<any> {
        return this.http.get('/publication-control/publication/find/' + publicationId, {headers: this.httpOptions()});
    }

    editById(publicationId: number): Observable<any> {
        return this.http.get('/publication-control/publication/edit/' + publicationId, {headers: this.httpOptions()});
    }

    deletePublicationPicture(publicationId: number): Observable<any> {
        return this.http.delete('/publication-control/publication/delete/picture/' + publicationId, {
            headers: this.httpOptions(),
            responseType: 'text'
        });
    }

    deletePublicationById(publicationId: number): Observable<any> {
        return this.http.get('/publication-control/publication/delete/publication/' + publicationId, {
            headers: this.httpOptions(),
            responseType: 'text'
        });
    }

    homeAllByUserId(params: string, userId: number): Observable<any> {
        if (localStorage.getItem('token') !== null) {
            return this.http.get('/publication-control/publication/home/' + userId + '?' + params, {headers: this.httpOptions()});
        } else {
        }
    }

}

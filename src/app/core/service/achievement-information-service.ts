import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AchievementInformationService {

    constructor(private http: HttpClient) {
    }

    /***
     * Token header
     * */
    private httpOptions(): HttpHeaders {
        return new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    }


    // createNewAchievement(file: File, name: string, description: string, webPage: string): Observable<any> {
    createNewAchievement(file: File, name: string): Observable<any> {
        // @ FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
        const uploadImageData = new FormData();
        uploadImageData.append('file', file);

        // return this.http.post('/teacher-control/achievement/file/upload/' + name + '/' + description + '/' + webPage, uploadImageData);
        return this.http.post('/teacher-control/achievement/file/upload/' + name, uploadImageData, {headers: this.httpOptions(), responseType: 'text'});
    }

    findAllAchievement(params: string): Observable<any> {
        return this.http.get('/teacher-control/achievement/all?' + params, {headers: this.httpOptions()});
    }

    findById(id: number): Observable<any> {
        return this.http.get('/teacher-control/achievement/' + id, {headers: this.httpOptions()});
    }

}

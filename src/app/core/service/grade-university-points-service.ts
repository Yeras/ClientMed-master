import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GradeUniversityPoints} from '../models/grade-university-points';

@Injectable({
    providedIn: 'root'
})
export class GradeUniversityPointsService {

    constructor(private http: HttpClient) {
    }

    /***
     * Token header
     * */
    private httpOptions(): HttpHeaders {
        return new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    }


    putGrade(gradeUniversityPoints: GradeUniversityPoints): Observable<any> {
        return this.http.post('/university-control/grade', gradeUniversityPoints, {headers: this.httpOptions()});
    }

    findAllUniversityWithRating(params: string): Observable<any> {
        return this.http.get('/university-control/grade/university/rating?' + params, {headers: this.httpOptions()});
    }

    searchUniversityWithRatingByName(params: string, universityName: string): Observable<any> {
        return this.http.get('/university-control/grade/university/rating/search/' + universityName + '?' + params, {headers: this.httpOptions()});
    }

    searchUniversityWithRatingByCountry(params: string, countryName: string): Observable<any> {
        return this.http.get('/university-control/grade/country/rating/search/' + countryName + '?' + params, {headers: this.httpOptions()});
    }

    searchUniversityWithRatingByCountryAndUniversity(params: string, countryName: string, universityName: string): Observable<any> {
        return this.http.get('/university-control/grade/rating/search/' + countryName + '/' + universityName + '?' + params, {headers: this.httpOptions()});
    }

    getUniversityGradeByUser(universityId: number, userId: number): Observable<any> {
        return this.http.get('/university-control/grade/user/' + universityId + '/' + userId, {headers: this.httpOptions()});
    }

    findUniversityFullGrade(universityId: number): Observable<any> {
        return this.http.get('/university-control/grade/university/' + universityId, {headers: this.httpOptions()});
    }

}

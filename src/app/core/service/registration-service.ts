import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {UserLogin} from '../models/UserLogin';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class RegistrationService {

    constructor(private http: HttpClient) {
    }

    /***
     * Token header
     * */
    private httpOptions(): HttpHeaders {
        return new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    }


    public registrationUser(userLogin: UserLogin): Observable<any> {
        return this.http.post('/registration', userLogin, {headers: this.httpOptions()});
    }

    public userAccountActivation(activationToken: string): Observable<any> {
        return this.http.get('/activation' + activationToken);
    }

    public userActivationStat(activationToken: string): Observable<any> {
        return this.http.get('/activation/stat' + activationToken);
    }

    public tokenRegenerate(emailId: string): Observable<any> {
        return this.http.get('/regenerate/token/stat?emailId=' + emailId, {responseType: 'text'});
    }

    public userAccountStatus(emailId: string): Observable<any> {
        return this.http.get('/status/user?emailId=' + emailId);
    }

    public loginUserFromRemote(userLogin: UserLogin): Observable<any> {
        return this.http.post('/login', userLogin, {headers: this.httpOptions()});
    }

    public getToken(userLogin: UserLogin): Observable<any> {
        const requestParam = new FormData();

        requestParam.append('username', userLogin.emailId);
        requestParam.append('password', userLogin.password);

        return this.http.post('/api/authenticate', requestParam, {observe: 'response', responseType: 'text'});
    }

    public checkAccountEmail(emailId: string): Observable<any> {
        return this.http.get('/check/user/' + emailId, {headers: this.httpOptions(), responseType: 'text'});
    }

    // Not used
    public findByEmail(emailId: string): Observable<any> {
        return this.http.get('/user/' + emailId, {headers: this.httpOptions()});
    }

    /*******************************
     * DEACTIVATE ACCOUNT
     * *****************************/
    public deactivateAccount(userId: number): Observable<any> {
        return this.http.get('/deactivate/account/' + userId, {headers: this.httpOptions(), responseType: 'text'});
    }

    /*******************************
     * CHANGE PASSWORD
     * *****************************/
    public changePassword(emailId: string, oldPassword: string, newPassword: string): Observable<any> {
        const requestParam = new FormData();

        requestParam.append('emailId', emailId);
        requestParam.append('oldPass', oldPassword);
        requestParam.append('newPass', newPassword);

        return this.http.post('/password/change', requestParam, {headers: this.httpOptions(), responseType: 'text'});
    }

    /*******************************
     * CHANGE LANGUAGE
     * *****************************/
    public changeLanguage(emailId: string, language: string): Observable<any> {
        const requestParam = new FormData();

        requestParam.append('emailId', emailId);
        requestParam.append('language', language);

        return this.http.post('/language/change', requestParam, {headers: this.httpOptions(), responseType: 'text'});
    }

    /*******************************
     * FORGOT PASSWORD
     * *****************************/
    public forgotPassword(emailId: string): Observable<any> {
        const requestParam = new FormData();

        requestParam.append('emailId', emailId);

        return this.http.post('/forgot/password', requestParam, {headers: this.httpOptions(), responseType: 'text'});
    }

    public activateForgotNewPassword(passwordToken: string): Observable<any> {
        return this.http.get('/activation/forgot/password' + passwordToken, {responseType: 'text'});
    }

}

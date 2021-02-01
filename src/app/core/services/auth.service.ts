import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable(
    {providedIn: 'root'}
)
export class AuthService {
    constructor(protected http: HttpClient) {
    }

    login(username: string, password: string) {

        const authData = new FormData();
        authData.append('username', username);
        authData.append('password', password);
        return this.http.post('/cea/login', authData, {observe: 'response', responseType: 'text'});
    }

    resetAll(): void {
        localStorage.removeItem('emailId');
        localStorage.removeItem('username');
        localStorage.removeItem('token');
    }

}

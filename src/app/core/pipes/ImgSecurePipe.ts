import {Pipe, PipeTransform} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Pipe({
    name: 'secure'
})
export class ImgSecurePipe implements PipeTransform {

    constructor(private http: HttpClient,
                private sanitizer: DomSanitizer) {
    }

    transform(url): Observable<SafeUrl> {
        return this.http
            .get(url, {responseType: 'blob', headers: {'Authorization': localStorage.getItem('token')}})
            .pipe(map(val => this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(val))));
    }

}

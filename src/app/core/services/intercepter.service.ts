import {Injectable} from '@angular/core';
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map, shareReplay} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {PersistenceService} from './persistence.service';
import {Error} from 'tslint/lib/error';
import {ServiceBaseUrlConstants} from '../constant/service-base-url.constants';
import {ResponseModel} from '../model/response.model';

@Injectable()
export class Interceptor implements HttpInterceptor {
    constructor(private persistence: PersistenceService,
                private router: Router,
                private route: ActivatedRoute) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const headers = req.headers;
        // paste token
        if (req.responseType === 'blob') {
            return next.handle(
                req.clone({headers})
            ).pipe(
                // handle response data
                map(
                    event => {
                        if (event instanceof HttpResponse) {
                            event = event.clone({body: this.processResponseData(event.body, req.url)});
                        }
                        return event;
                    }
                ));
        } else {
            return next.handle(
                req.clone({headers})
            ).pipe(
                // handle response data
                map(
                    event => {
                        if (event instanceof HttpResponse) {
                            event = event.clone({body: this.processResponseData(event.body, req.url)});
                        }
                        return event;
                    }
                ),
                // handle unauthorized request
                catchError((error: any) => {
                    if (error instanceof HttpErrorResponse) {
                        if (error.status === 401 || error.status === 403) {
                            if (window.location.href.includes('activation')
                                || window.location.href.includes('generate')
                                || window.location.href.includes('message')) {
                            } else {
                                this.router.navigate(['login']);
                            }
                        } else if (error.status === 404 || error.status === 504) {
                            if (window.location.href.includes('activation')
                                || window.location.href.includes('generate')
                                || window.location.href.includes('message')) {
                            } else {
                                if (localStorage.getItem('token') == null) {
                                    this.router.navigate(['login']);
                                }
                            }
                        }
                    }
                    return throwError(error);
                })
            );
        }
    }

    processResponseData(body, url) {
        const responseModel = new ResponseModel(body);
        if (responseModel.isError()) {
            this.showConsoleError(responseModel.error_code, url);
            throw new Error(responseModel.error_description);
        }
        return responseModel.data;
    }

    showConsoleError(status, url): void {
    }
}

import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { empty, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { catchError, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class Webrequestintercaptor implements HttpInterceptor {

  refreshingAccessToken:Boolean;

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    request = this.addAuthheaders(request);

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401 && !this.refreshingAccessToken) {
         return this.refreshAccessToken().pipe(
            switchMap(() => {
              request = this.addAuthheaders(request);
              return next.handle(request);
            }),
            catchError((err: any) => {
              this.authService.logout();
              return empty();
            })
          );
        }
      })
    );
  }

  refreshAccessToken() {
    this.refreshingAccessToken = true;
    return this.authService.getNewAccessToken().pipe(
      tap(() => {
        this.refreshingAccessToken = false;
        console.log('access token refresh');
      })
    );
  }

  addAuthheaders(request: HttpRequest<any>) {
    const token = this.authService.getAccessToken();
    if (token) {
      return request.clone({
        headers: request.headers.set('x-access-token', token),
      });
    }
    return request;
  }
}

import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { WebrequestService } from './webrequest.service';
import { shareReplay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private httpclient: HttpClient,
    private webservice: WebrequestService,
    private router: Router
  ) {}

  login(email: string, password: string) {
    return this.webservice.login(email, password).pipe(
      shareReplay(),
      tap((resp: HttpResponse<any>) => {
        this.setSession(
          resp.body._id,
          resp.headers.get('x-access-token'),
          resp.headers.get('x-refresh-token')
        );
      })
    );
  }

  register(email: string, password: string) {
    return this.webservice.register(email, password).pipe(
      shareReplay(),
      tap((resp: HttpResponse<any>) => {
        this.setSession(
          resp.body._id,
          resp.headers.get('x-access-token'),
          resp.headers.get('x-refresh-token')
        );
      })
    );
  }

  getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  setAccessToken(accessToken) {
    localStorage.setItem('accessToken', accessToken);
  }

  getrefreshToken() {
    return localStorage.getItem('refreshToken');
  }

  getUserId() {
    return localStorage.getItem('_id');
  }

  setrefreshToken(refreshToken) {
    localStorage.setItem('refreshToken', refreshToken);
  }

  private setSession(
    userid: string,
    accessToken: string,
    refreshToken: string
  ) {
    localStorage.setItem('user-id', userid);
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  private removeSession() {
    localStorage.removeItem('user-id');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  logout() {
    this.removeSession();
    this.router.navigateByUrl('/login');
  }

  getNewAccessToken() {
    return this.httpclient
      .get('/user/me/access-token', {
        headers: {
          'x-refresh-token': this.getrefreshToken(),
          _id: this.getUserId(),
        },
        observe: 'response',
      })
      .pipe(
        tap((res: HttpResponse<any>) => {
          this.setAccessToken(res.headers.get('access-token'));
        })
      );
  }
}

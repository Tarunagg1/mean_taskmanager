import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (this.authService.getAccessToken()) {
      this.router.navigateByUrl('/');
    }
  }

  onCLickLogin(email: string, password: string) {
    this.authService
      .login(email, password)
      .subscribe((response: HttpResponse<any>) => {
        if (response.status === 200) {
          this.router.navigateByUrl('/list');
        }
      });
  }
}

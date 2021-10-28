import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss'],
})
export class SignupPageComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onCLickRegister(email: string, password: string): void {
    this.authService
      .register(email, password)
      .subscribe((response: HttpResponse<any>) => {
        if (response.status === 200) {
          this.router.navigateByUrl('/');
        }
      });
  }
}

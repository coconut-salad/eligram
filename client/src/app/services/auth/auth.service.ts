import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import axios from 'axios';
import { AuthUser, SignUpForm } from 'src/app/models/auth-forms';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly BASE_URL = 'http://localhost:3000/api';
  private authToken = '';
  private isAuth = false;
  private user: AuthUser = {
    email: '',
    emailVerified: false,
    id: '',
    profileComplete: false,
  };

  constructor(private _snackBar: MatSnackBar, private router: Router) {}

  signup(signupForm: SignUpForm) {
    axios
      .post(this.BASE_URL + '/auth/signup', { ...signupForm })
      .then((result) => {
        this._snackBar.open(result.data.message, '', { duration: 2500 });
        this.authToken = result.data.token;
        this.user = JSON.parse(window.atob(this.authToken.split('.')[1]));
        this.isAuth = true;
        localStorage.setItem('token', this.authToken);
        localStorage.setItem('user', JSON.stringify(this.user));
        this.router.navigate(['/auth', 'verify-email']);
      })
      .catch((err) => {
        this._snackBar.open(err.response.data.message, '', { duration: 2500 });
      });
  }

  verifyEmail(vCode: number) {
    axios
      .post(
        this.BASE_URL + '/auth/verify-email',
        { vCode },
        {
          headers: {
            Authorization: this.authToken,
          },
        }
      )
      .then((result) => {
        this._snackBar.open(result.data.message, '', { duration: 2500 });
        this.authToken = result.data.token;
        this.user = JSON.parse(window.atob(this.authToken.split('.')[1]));
        this.isAuth = true;
        localStorage.setItem('token', this.authToken);
        localStorage.setItem('user', JSON.stringify(this.user));
        this.router.navigate(['/auth', 'complete-profile']);
      })
      .catch((err) => {
        this._snackBar.open(err.response.data.message, '', { duration: 2500 });
      });
  }
}

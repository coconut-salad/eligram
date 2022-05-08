import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import axios from 'axios';
import { Subject } from 'rxjs';
import { AuthUser, LoginForm, SignUpForm } from 'src/app/models/auth-forms';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly BASE_URL = 'http://localhost:3000/api';
  private authToken = '';
  private isAuth = false;
  private authStatusNotifier = new Subject<boolean>();
  private userChangeNotifier = new Subject<AuthUser>();
  private user: AuthUser = {
    id: '',
    email: '',
    emailVerified: false,
    profileComplete: false,
  };

  constructor(private _snackBar: MatSnackBar, private router: Router) {}

  getUser() {
    return this.user;
  }

  getAuthStatus() {
    return this.isAuth;
  }

  getAuthStatusNotifier() {
    return this.authStatusNotifier.asObservable();
  }

  autoLogin() {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    this.handleTokenChange('', token);
    axios
      .post(this.BASE_URL + '/auth/verify-token', { token })
      .then((result) => {
        if (result.data.valid) {
          this.handleTokenChange('', token);
          return;
        }
      })
      .catch((err) => {
        this._snackBar.open('Session Expired', '', { duration: 2500 });
        this.logout();
      });
  }

  handleTokenChange(message: string, token: string) {
    if (message.length > 0) {
      this._snackBar.open(message, '', { duration: 2500 });
    }
    this.authToken = token;
    this.user = JSON.parse(window.atob(this.authToken.split('.')[1]));
    this.isAuth = true;
    this.authStatusNotifier.next(true);
    this.userChangeNotifier.next(this.user);
    localStorage.setItem('token', this.authToken);
    localStorage.setItem('user', JSON.stringify(this.user));
  }

  signup(signupForm: SignUpForm) {
    axios
      .post(this.BASE_URL + '/auth/signup', { ...signupForm })
      .then((result) => {
        this.handleTokenChange(result.data.message, result.data.token);
        this.router.navigate(['/auth', 'verify-email']);
      })
      .catch((err) => {
        this._snackBar.open(err.response.data.message, '', { duration: 2500 });
      });
  }

  login(loginForm: LoginForm) {
    axios
      .post(this.BASE_URL + '/auth/login', {
        email: loginForm.email,
        password: loginForm.password,
      })
      .then((result) => {
        this.handleTokenChange(result.data.message, result.data.token);
        this.router.navigate(['/']);
      })
      .catch((err) => {
        this._snackBar.open(err.response.data.message, '', { duration: 2500 });
      });
  }

  logout() {
    this.authToken = '';
    this.isAuth = false;
    this.user = {
      email: '',
      emailVerified: false,
      id: '',
      profileComplete: false,
    };
    this.authStatusNotifier.next(false);
    this.userChangeNotifier.next(this.user);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/auth', 'login']);
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
        this.handleTokenChange(result.data.message, result.data.token);
        this.router.navigate(['/auth', 'complete-profile']);
      })
      .catch((err) => {
        this._snackBar.open(err.response.data.message, '', { duration: 2500 });
      });
  }

  completeProfile(dateOfBirth: string, gender: string) {
    axios
      .post(
        this.BASE_URL + '/auth/complete-profile',
        {
          dateOfBirth,
          gender,
        },
        {
          headers: {
            Authorization: this.authToken,
          },
        }
      )
      .then((result) => {
        this.handleTokenChange(result.data.message, result.data.token);
        this.router.navigate(['/']);
      })
      .catch((err) => {
        this._snackBar.open(err.response.data.message, '', { duration: 2500 });
      });
  }
}

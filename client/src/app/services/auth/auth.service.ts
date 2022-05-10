import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import axios from 'axios';
import { Subject } from 'rxjs';
import {
  AuthUser,
  GoogleSignInUser,
  LoginForm,
  Roles,
  SignUpForm,
} from 'src/app/models/auth-forms';
import { ProgressIndicatorService } from '../progress/progress-indicator.service';

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
    username: '',
    profileImg: '',
    role: Roles.USER,
    emailVerified: false,
    profileComplete: false,
  };

  constructor(
    private progressIndicatorService: ProgressIndicatorService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private zone: NgZone
  ) {}

  getUser() {
    return this.user;
  }

  getUserNotifier() {
    return this.userChangeNotifier.asObservable();
  }

  getAuthStatus() {
    return this.isAuth;
  }

  getAuthStatusNotifier() {
    return this.authStatusNotifier.asObservable();
  }

  autoLogin() {
    this.progressIndicatorService.turnOnLoading();
    const token = localStorage.getItem('token');
    if (!token) {
      this.progressIndicatorService.turnOffLoading();
      return;
    }
    this.handleTokenChange('', token);
    axios
      .post(this.BASE_URL + '/auth/verify-token', { token })
      .then((result) => {
        if (result.data.valid) {
          this.handleTokenChange('', token);
          this.progressIndicatorService.turnOffLoading();
          return;
        }
      })
      .catch((err) => {
        this._snackBar.open('Session Expired', '', { duration: 2500 });
        this.progressIndicatorService.turnOffLoading();
        this.logout();
      });
  }

  handleTokenChange(message: string, token: string) {
    if (message.length > 0) {
      this._snackBar.open(message, '', { duration: 2500 });
    }
    this.authToken = token;
    this.user = JSON.parse(window.atob(this.authToken.split('.')[1]));
    if (this.user.profileImg.startsWith('/')) {
      this.user.profileImg =
        this.BASE_URL.split('/api')[0] + '/assets/images/user-default.png';
    }
    this.isAuth = true;
    this.authStatusNotifier.next(true);
    this.userChangeNotifier.next(this.user);
    localStorage.setItem('token', this.authToken);
    localStorage.setItem('user', JSON.stringify(this.user));
  }

  signup(signupForm: SignUpForm) {
    this.progressIndicatorService.turnOnLoading();
    axios
      .post(this.BASE_URL + '/auth/signup', { ...signupForm })
      .then((result) => {
        this.progressIndicatorService.turnOffLoading();
        this.handleTokenChange(result.data.message, result.data.token);
        this.router.navigate(['/auth', 'verify-email']);
      })
      .catch((err) => {
        this.progressIndicatorService.turnOffLoading();
        this._snackBar.open(err.response.data.message, '', { duration: 2500 });
      });
  }

  login(loginForm: LoginForm) {
    this.progressIndicatorService.turnOnLoading();
    axios
      .post(this.BASE_URL + '/auth/login', {
        email: loginForm.email,
        password: loginForm.password,
      })
      .then((result) => {
        this.progressIndicatorService.turnOffLoading();
        this.handleTokenChange(result.data.message, result.data.token);
        this.router.navigate(['/']);
      })
      .catch((err) => {
        this.progressIndicatorService.turnOffLoading();
        this._snackBar.open(err.response.data.message, '', { duration: 2500 });
      });
  }

  logout() {
    this.authToken = '';
    this.isAuth = false;
    this.user = {
      id: '',
      email: '',
      role: 'USER',
      username: '',
      profileImg: '',
      emailVerified: false,
      profileComplete: false,
    };
    this.authStatusNotifier.next(false);
    this.userChangeNotifier.next(this.user);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/auth', 'login']);
  }

  loginWithGoogle(user: GoogleSignInUser) {
    this.progressIndicatorService.turnOnLoading();
    axios
      .post(this.BASE_URL + '/auth/google', { user })
      .then((result) => {
        this.progressIndicatorService.turnOffLoading();
        this.zone.run(() => {
          this.handleTokenChange(result.data.message, result.data.token);
          this.router.navigate(['/']);
        });
      })
      .catch((err) => {
        this.progressIndicatorService.turnOffLoading();
        console.log(err.response);
        console.log(err);
        this._snackBar.open(err.response.data.message, '', { duration: 2500 });
      });
  }

  verifyEmail(vCode: number) {
    this.progressIndicatorService.turnOnLoading();
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
        this.progressIndicatorService.turnOffLoading();
        this.handleTokenChange(result.data.message, result.data.token);
        this.router.navigate(['/auth', 'complete-profile']);
      })
      .catch((err) => {
        this.progressIndicatorService.turnOffLoading();
        this._snackBar.open(err.response.data.message, '', { duration: 2500 });
      });
  }

  completeProfile(dateOfBirth: string, gender: string) {
    this.progressIndicatorService.turnOnLoading();
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
        this.progressIndicatorService.turnOffLoading();
        this.handleTokenChange(result.data.message, result.data.token);
        this.router.navigate(['/']);
      })
      .catch((err) => {
        this.progressIndicatorService.turnOffLoading();
        this._snackBar.open(err.response.data.message, '', { duration: 2500 });
      });
  }
}

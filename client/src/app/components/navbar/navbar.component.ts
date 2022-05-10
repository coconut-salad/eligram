import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthUser, Roles } from 'src/app/models/auth-forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  isAuth = false;
  user: AuthUser = {
    id: '',
    email: '',
    role: 'USER',
    username: '',
    profileImg: '',
    emailVerified: false,
    profileComplete: false,
  };
  isAuthSubscription = new Subscription();
  userSubscription = new Subscription();
  constructor(private authService: AuthService) {}

  ngOnDestroy(): void {
    this.isAuthSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.isAuthSubscription = this.authService
      .getAuthStatusNotifier()
      .subscribe((status) => {
        this.isAuth = status;
      });
    this.userSubscription = this.authService
      .getUserNotifier()
      .subscribe((user) => {
        this.user = user;
      });
  }

  logout() {
    this.authService.logout();
  }
}

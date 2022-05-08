import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  isAuth = false;
  isAuthSubscription = new Subscription();
  constructor(private authService: AuthService) {}

  ngOnDestroy(): void {
    this.isAuthSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.isAuthSubscription = this.authService
      .getAuthStatusNotifier()
      .subscribe((status) => {
        this.isAuth = status;
      });
  }

  logout() {
    this.authService.logout();
  }
}

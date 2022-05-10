import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth/auth.service';
import { ProgressIndicatorService } from './services/progress/progress-indicator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  isLoading = false;
  isLoadingSub = new Subscription();
  constructor(
    private authService: AuthService,
    private progressIndicatorService: ProgressIndicatorService
  ) {}
  ngOnDestroy(): void {
    this.isLoadingSub.unsubscribe();
  }

  ngOnInit(): void {
    this.authService.autoLogin();
    this.isLoadingSub = this.progressIndicatorService
      .getLoadingStatusNotifier()
      .subscribe((status) => {
        this.isLoading = status;
      });
  }
}

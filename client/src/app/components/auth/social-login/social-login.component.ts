import { Component, OnInit } from '@angular/core';
import { SocialLoginService, Provider } from 'ngx-social-login';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProgressIndicatorService } from 'src/app/services/progress/progress-indicator.service';

@Component({
  selector: 'app-social-login',
  templateUrl: './social-login.component.html',
  styleUrls: ['./social-login.component.css'],
})
export class SocialLoginComponent implements OnInit {
  constructor(
    private progressIndicatorService: ProgressIndicatorService,
    private socialLoginService: SocialLoginService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}
  signInWithGoogle() {
    this.progressIndicatorService.turnOnLoading();
    this.socialLoginService.login(Provider.GOOGLE).subscribe(
      (user) => {
        this.progressIndicatorService.turnOffLoading();
        console.log(user);
        this.authService.loginWithGoogle(user);
      },
      (e) => {
        console.log(e);
        this.progressIndicatorService.turnOffLoading();
      }
    );
  }
}

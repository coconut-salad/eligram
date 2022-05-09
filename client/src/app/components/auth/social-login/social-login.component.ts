import { Component, OnInit } from '@angular/core';
import { SocialLoginService, Provider } from 'ngx-social-login';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-social-login',
  templateUrl: './social-login.component.html',
  styleUrls: ['./social-login.component.css'],
})
export class SocialLoginComponent implements OnInit {
  constructor(
    private socialLoginService: SocialLoginService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}
  signInWithGoogle() {
    this.socialLoginService.login(Provider.GOOGLE).subscribe(
      (user) => {
        console.log(user);
        this.authService.loginWithGoogle(user);
      },
      (e) => {
        console.log(e);
      }
    );
  }
}

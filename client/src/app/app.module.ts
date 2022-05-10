import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSocialLoginModule } from 'ngx-social-login';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AppMaterialModule } from './modules/app-material/app-material.module';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { VerifyEmailComponent } from './components/auth/verify-email/verify-email.component';
import { CompleteProfileComponent } from './components/auth/complete-profile/complete-profile.component';
import { FeedComponent } from './components/home/feed/feed.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { SocialLoginComponent } from './components/auth/social-login/social-login.component';
import { StrikeTextDirective } from './directives/strike-text.directive';
import { UserProfileComponent } from './components/users/user-profile/user-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    VerifyEmailComponent,
    CompleteProfileComponent,
    FeedComponent,
    NotFoundComponent,
    DashboardComponent,
    SocialLoginComponent,
    StrikeTextDirective,
    UserProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppMaterialModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    NgxSocialLoginModule.init({
      google: {
        client_id:
          '239251759381-h1lh7kvnjv1f2ao4640a2rgsgfgk72dm.apps.googleusercontent.com',
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

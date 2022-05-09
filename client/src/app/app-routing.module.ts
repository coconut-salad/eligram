import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompleteProfileComponent } from './components/auth/complete-profile/complete-profile.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { VerifyEmailComponent } from './components/auth/verify-email/verify-email.component';
import { FeedComponent } from './components/home/feed/feed.component';
import { EmailVerifiedGuard } from './services/guards/email-verified.guard';
import { IsAuthGuard } from './services/guards/is-auth.guard';
import { ProfileCompleteGuard } from './services/guards/profile-complete.guard';
import { WizardGuard } from './services/guards/wizard.guard';

const routes: Routes = [
  {
    path: '',
    component: FeedComponent,
    canActivate: [IsAuthGuard, WizardGuard],
    data: { authRequired: true },
  },
  {
    path: 'auth/login',
    component: LoginComponent,
    canActivate: [IsAuthGuard],
    data: { authRequired: false },
  },
  {
    path: 'auth/signup',
    component: SignupComponent,
    canActivate: [IsAuthGuard],
    data: { authRequired: false },
  },
  {
    path: 'auth/verify-email',
    component: VerifyEmailComponent,
    canActivate: [IsAuthGuard, EmailVerifiedGuard],
    data: { authRequired: true },
  },
  {
    path: 'auth/complete-profile',
    component: CompleteProfileComponent,
    canActivate: [IsAuthGuard, ProfileCompleteGuard],
    data: { authRequired: true },
  },
  {
    path: '**',
    redirectTo: '/',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

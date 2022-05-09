import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class WizardGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (
      !this.authService.getUser().emailVerified &&
      !this.authService.getUser().profileComplete
    ) {
      this.router.navigate(['/auth', 'verify-email']);
      return false;
    }

    if (
      this.authService.getUser().emailVerified &&
      !this.authService.getUser().profileComplete
    ) {
      this.router.navigate(['/auth', 'complete-profile']);
      return false;
    }

    if (
      this.authService.getUser().emailVerified &&
      this.authService.getUser().profileComplete
    ) {
      return true;
    }

    return false;
  }
}

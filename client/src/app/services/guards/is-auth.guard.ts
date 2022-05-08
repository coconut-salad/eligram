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
export class IsAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!route.data['authRequired']) {
      if (this.authService.getAuthStatus()) {
        this.router.navigate(['/']);
        return false;
      } else {
        return true;
      }
    }

    if (route.data['authRequired']) {
      if (!this.authService.getAuthStatus()) {
        this.router.navigate(['/auth', 'login']);
        return false;
      } else {
        return true;
      }
    }

    return false;
  }
}

import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router
} from '@angular/router';
import { AuthenticationService } from '@ecommerce/core';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '../services/notification.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private readonly translate: TranslateService,
    private notificationService: NotificationService,
    private authenticationService: AuthenticationService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot
  ): boolean {
    if (this.authenticationService.currentUserValue) {
      return true;
    }
    this.router.navigate(['user/login'], {
      queryParams: { returnUrl: route.queryParams.returnUrl },
    });
    this.translate.get('please-login-message').subscribe((value) => {
      this.notificationService.showInfo(value);
    });
    return false;
  }
}

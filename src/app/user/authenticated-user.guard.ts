import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '../core/services/notification.service';
import { AppConstants } from '../shared/constant/app.constant';

@Injectable({
  providedIn: 'root',
})
export class AuthenticatedUserGuard implements CanActivate {
  constructor(
    private router: Router,
    private readonly translate: TranslateService,
    private notificationService: NotificationService
  ) {}
  canActivate(): boolean {
    if (
      !!localStorage.getItem('TOKEN') &&
      localStorage.getItem('TOKEN') === AppConstants.authToken &&
      !!localStorage.getItem('EMAIL')
    ) {
      return true;
    }
    localStorage.clear();
    this.router.navigate(['user/login']);
    this.translate.get('please-login-message').subscribe((value) => {
      this.notificationService.showInfo(value);
    });
    return false;
  }
}

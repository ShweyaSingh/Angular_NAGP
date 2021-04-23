import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AppConstants } from '../shared/constant/app.constant';

@Injectable({
  providedIn: 'root',
})
export class AuthenticatedUserGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(): boolean {
    if (
      !!localStorage.getItem('TOKEN') &&
      localStorage.getItem('TOKEN') === AppConstants.authToken &&
      !!localStorage.getItem('EMAIL')
    ) {
      return true;
    }
    this.router.navigate(['/user/login']);
    return false;
  }
}

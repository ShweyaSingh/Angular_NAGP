import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AppConstants } from '../shared/constant/app.constant';

@Injectable({
  providedIn: 'root',
})
export class UnauthenticatedUserGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(): boolean {
    if (
      !!localStorage.getItem('TOKEN') &&
      localStorage.getItem('TOKEN') === AppConstants.authToken &&
      !!localStorage.getItem('EMAIL')
    ) {
      this.router.navigate(['/products']);
      return false;
    }
    return true;
  }
}

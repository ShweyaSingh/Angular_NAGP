import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from '../constant/app.constant';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './navbar.component.html',
})
export class NavBarComponent {
  public search = '';

  /**
   * Property that tell whether user is logged in
   */
  public get isLoggedIn(): boolean {
    return (
      !!localStorage.getItem('TOKEN') &&
      localStorage.getItem('TOKEN') === AppConstants.authToken &&
      !!localStorage.getItem('EMAIL')
    );
  }

  constructor(private router: Router) {}

  /**
   * Method that logout the user from the portal.
   */
  public logout(): void {
    localStorage.clear();
    this.router.navigate(['/products']);
  }

  /**
   * Navigate To Home
   */
  public navigateToHome(): void {
    this.search = '';
    this.router.navigate(['/products']);
  }

  /**
   * Search Product
   */
  public searchProduct(): void {
    if (this.search) {
      this.router.navigate(['/products/search/' + this.search]);
    } else {
      this.router.navigate(['/products']);
    }
  }
}

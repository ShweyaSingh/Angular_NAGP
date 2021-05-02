import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '@ecommerce/core';
import { AppConstants } from '@ecommerce/shared';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
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

  public get userName(): string {
    return localStorage.getItem('EMAIL') ?? '';
  }

  constructor(
    private router: Router,
    public readonly translate: TranslateService,
    private notificationService: NotificationService
  ) {}

  /**
   * Method that logout the user from the portal.
   */
  public logout(): void {
    localStorage.clear();
    this.router.navigate(['/products']);
    this.translate.get('logout-success-message').subscribe((value) => {
      this.notificationService.showSuccess(value);
    });
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

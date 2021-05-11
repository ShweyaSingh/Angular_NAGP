import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  AuthenticationService,
  CartService,
  NotificationService
} from '@ecommerce/core';
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
    return !!this.authenticationService.currentUserValue;
  }

  public get cartProductsCount(): number {
    return this.cartService.cartProdctsCountValue;
  }

  constructor(
    private router: Router,
    public readonly translate: TranslateService,
    private notificationService: NotificationService,
    private cartService: CartService,
    private authenticationService: AuthenticationService
  ) {}

  /**
   * Method that logout the user from the portal.
   */
  public logout(): void {
    this.authenticationService.logout();
    this.router.navigate(['/products']);
    this.translate.get('logout-success-message').subscribe((value) => {
      this.notificationService.showSuccess(value);
    });
  }

  /**
   * Navigate To Home
   */
  public clearSearch(): void {
    this.search = '';
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

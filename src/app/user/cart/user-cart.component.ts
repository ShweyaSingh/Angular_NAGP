import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartDetail, CartService, NotificationService } from '@ecommerce/core';
import { AppConstants } from '@ecommerce/shared';
import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: './user-cart.component.html',
})
export class UserCartComponent implements OnInit {
  public cart: CartDetail;

  constructor(
    private router: Router,
    private cartService: CartService,
    private readonly translate: TranslateService,
    private notificationService: NotificationService
  ) {}

  public ngOnInit(): void {
    if (this.isLoggedIn) {
      const email = localStorage.getItem('EMAIL');
      if (!!email) {
        this.cartService.getCartDetails(email).subscribe((response) => {
          if (response.success) {
            this.cart = response.content;
          } else {
            localStorage.clear();
            this.router.navigate(['user/login']);
            this.translate
              .get('something-went-wrong-message')
              .subscribe((value) => {
                this.notificationService.showError(value);
              });
          }
        });
      }
    } else {
      localStorage.clear();
      this.router.navigate(['user/login']);
    }
  }

  public get isLoggedIn(): boolean {
    return (
      !!localStorage.getItem('TOKEN') &&
      localStorage.getItem('TOKEN') === AppConstants.authToken &&
      !!localStorage.getItem('EMAIL')
    );
  }

  /**
   * Total product Price getter property
   */
  public get totalProductPrice(): number {
    return this.cart.products.reduce(
      (a, b) => a + b.product.price * b.quantity,
      0
    );
  }

  /**
   * Shipping Price getter property
   */
  public get shippingPrice(): number {
    return this.cart.products.length * 10;
  }

  /**
   * Delete Product
   */
  public deleteProduct(id: number): void {
    if (this.isLoggedIn) {
      const email = localStorage.getItem('EMAIL');
      if (!!email) {
        this.cartService.deleteProduct(id, email).subscribe((response) => {
          if (response.success) {
            this.cart = response.content;
            this.translate.get('product-removed-message').subscribe((value) => {
              this.notificationService.showSuccess(value);
            });
          } else {
            localStorage.clear();
            this.router.navigate(['user/login']);
            this.translate
              .get('something-went-wrong-message')
              .subscribe((value) => {
                this.notificationService.showError(value);
              });
          }
        });
      }
    } else {
      localStorage.clear();
      this.translate.get('something-went-wrong-message').subscribe((value) => {
        this.notificationService.showError(value);
      });
      this.router.navigate(['user/login']);
    }
  }

  /**
   * Change Qty
   */
  public changeQty(id: number, qty: number): void {
    if (this.isLoggedIn) {
      const email = localStorage.getItem('EMAIL');
      if (!!email) {
        this.cartService.changeQty(id, qty, email).subscribe((response) => {
          if (response.success) {
            this.cart = response.content;
          } else {
            localStorage.clear();
            this.router.navigate(['user/login']);
            this.translate
              .get('something-went-wrong-message')
              .subscribe((value) => {
                this.notificationService.showError(value);
              });
          }
        });
      }
    } else {
      localStorage.clear();
      this.translate.get('something-went-wrong-message').subscribe((value) => {
        this.notificationService.showError(value);
      });
      this.router.navigate(['user/login']);
    }
  }

  /**
   * Check Out
   */
  public checkOut(): void {
    this.router.navigate(['user/checkout']);
  }
}

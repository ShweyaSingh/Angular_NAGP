import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AuthenticationService,
  CartDetail,
  CartService,
  NotificationService,
  UserDetail
} from '@ecommerce/core';
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
    private notificationService: NotificationService,
    private authenticationService: AuthenticationService
  ) {}

  public ngOnInit(): void {
    if (this.currentUser) {
      this.cartService.getCartDetails().subscribe((cart) => {
        this.cart = cart;
      });
    }
  }

  public get currentUser(): UserDetail | null {
    return this.authenticationService.currentUserValue;
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
    if (this.currentUser) {
      this.cartService.deleteProduct(id).subscribe((response) => {
        this.cart = response;
        this.translate.get('product-removed-message').subscribe((value) => {
          this.notificationService.showInfo(value);
        });
      });
    }
  }

  /**
   * Change Qty
   */
  public changeQty(id: number, qty: number): void {
    if (this.currentUser) {
      this.cartService.changeQty(id, qty).subscribe((response) => {
        this.cart = response;
      });
    }
  }

  /**
   * Check Out
   */
  public checkOut(): void {
    this.router.navigate(['user/checkout']);
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  CartDetail,
  CartService,
  NotificationService
} from '@ecommerce/core';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';

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
    private spinner: NgxSpinnerService
  ) { }

  public ngOnInit(): void {
    this.spinner.show();
    this.cartService.getCartDetails()
      .pipe(
        finalize(() => {
          this.spinner.hide();
        })
      ).subscribe((cart) => {
        this.cart = cart;
      });
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
    this.spinner.show();
    this.cartService.deleteProduct(id)
      .pipe(
        finalize(() => {
          this.spinner.hide();
        })
      ).subscribe((response) => {
        this.cart = response;
        this.translate.get('product-removed-message').subscribe((value) => {
          this.notificationService.showInfo(value);
        });
      });
  }

  /**
   * Change Qty
   */
  public changeQty(id: number, qty: number): void {
    this.cartService.changeQty(id, qty).subscribe((response) => {
      this.cart = response;
    });
  }

  /**
   * Check Out
   */
  public checkOut(): void {
    this.router.navigate(['user/checkout']);
  }
}

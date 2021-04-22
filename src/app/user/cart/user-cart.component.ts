import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';
import { CartDetail } from 'src/app/shared/models/cart-detail';

@Component({
  templateUrl: './user-cart.component.html',
})
export class UserCartComponent implements OnInit {
  public cart: CartDetail;

  constructor(private router: Router, private cartService: CartService) {}

  public ngOnInit(): void {
    const email = localStorage.getItem('EMAIL');
    if (!!email) {
      this.cartService.getCartDetails(email).subscribe((response) => {
        if (response.success) {
          this.cart = response.content;
        } else {
          this.router.navigate(['/user/login']);
        }
      });
    } else {
      this.router.navigate(['user/login']);
    }
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
    this.cartService.deleteProduct(id, this.cart).subscribe((response) => {
      if (response.success) {
        this.cart = response.content;
      }
    });
  }

  /**
   * Change Qty
   */
  public changeQty(id: number, qty: number): void {
    this.cartService.changeQty(id, qty, this.cart).subscribe((response) => {
      if (response.success) {
        this.cart = response.content;
      }
    });
  }

  /**
   * Check Out
   */
  public checkOut(): void {
    this.router.navigate(['user/checkout']);
  }
}

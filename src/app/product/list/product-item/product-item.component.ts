import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';
import { AppConstants } from 'src/app/shared/constant/app.constant';
import { Product } from 'src/app/shared/models/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
})
export class ProductItemComponent {
  @Input() public product: Product;

  constructor(private router: Router, private cartService: CartService) {}

  public get isLoggedIn(): boolean {
    return (
      !!localStorage.getItem('TOKEN') &&
      localStorage.getItem('TOKEN') === AppConstants.authToken &&
      !!localStorage.getItem('EMAIL')
    );
  }

  public viewDetailPage(id: number): void {
    this.router.navigate(['products/product/' + id]);
  }

  public addToCart(product: Product): void {
    if (this.isLoggedIn) {
      const email = localStorage.getItem('EMAIL');
      if (!!email) {
        this.cartService.addProduct(product, email).subscribe((response) => {
          if (response.success) {
            this.router.navigate(['user/cart']);
            // add alert remove navigation
          } else {
            this.router.navigate(['user/login']);
          }
        });
      } else {
        this.router.navigate(['user/login']);
      }
    } else {
      this.router.navigate(['user/login']);
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppConstants } from 'src/app/shared/constant/app.constant';
import { Product } from 'src/app/shared/models/product';
import { ProductCategory } from 'src/app/shared/models/product-category';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  templateUrl: './product-detail.component.html',
})
export class ProductDetailComponent implements OnInit {
  public product: Product;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  public ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      const pid = Number(id);
      this.productService.getProduct(pid).subscribe((response) => {
        if (response.success) {
          this.product = response.content;
        } else {
          this.router.navigate(['/products']);
        }
      });
    }
  }

  public addToCart(product: Product): void {
    if (
      !!localStorage.getItem('TOKEN') &&
      localStorage.getItem('TOKEN') === AppConstants.authToken &&
      !!localStorage.getItem('EMAIL')
    ) {
      const email = localStorage.getItem('EMAIL');
      if (!!email) {
        this.cartService.addProduct(product, email).subscribe((response) => {
          if (response.success) {
            this.router.navigate(['user/cart']);
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

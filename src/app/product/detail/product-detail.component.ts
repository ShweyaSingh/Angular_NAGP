import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AuthenticationService,
  CartService,
  NotificationService,
  Product,
  ProductService,
  UserDetail,
} from '@ecommerce/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: './product-detail.component.html',
})
export class ProductDetailComponent implements OnInit {
  public product: Product;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService,
    private readonly translate: TranslateService,
    private notificationService: NotificationService,
    private authenticationService: AuthenticationService
  ) {}

  public ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      const pid = Number(id);
      this.productService.getProduct(pid).subscribe((response) => {
        this.product = response;
      });
    }
  }

  public get currentUser(): UserDetail | null {
    return this.authenticationService.currentUserValue;
  }

  public addToCart(product: Product): void {
    if (this.currentUser) {
      this.cartService.addProduct(product).subscribe((response) => {
        this.router.navigate(['user/cart']);
        this.translate.get('product-added-message').subscribe((value) => {
          this.notificationService.showInfo(value);
        });
      });
    } else {
      this.router.navigate(['user/cart'], {
        queryParams: { returnUrl: this.router.routerState.snapshot.url },
      });
    }
  }
}

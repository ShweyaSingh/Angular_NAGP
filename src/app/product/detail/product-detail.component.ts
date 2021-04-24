import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Product } from 'src/app/core/models';
import { CartService, NotificationService, ProductService } from 'src/app/core/services';
import { AppConstants } from 'src/app/shared/constant/app.constant';


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
    private notificationService: NotificationService
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
            this.translate.get('product-added-message').subscribe((value) => {
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
      this.router.navigate(['user/login']);
      this.translate.get('please-login-message').subscribe((value) => {
        this.notificationService.showInfo(value);
      });
    }
  }
}

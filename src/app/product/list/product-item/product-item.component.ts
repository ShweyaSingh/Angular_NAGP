import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CartService } from 'src/app/core/services/cart.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { AppConstants } from 'src/app/shared/constant/app.constant';
import { Product } from 'src/app/core/models/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
})
export class ProductItemComponent {
  @Input() public product: Product;

  constructor(
    private router: Router,
    private cartService: CartService,
    private readonly translate: TranslateService,
    private notificationService: NotificationService
  ) {}

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

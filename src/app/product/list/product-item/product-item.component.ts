import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import {
  AuthenticationService,
  CartService,
  NotificationService,
  Product,
  UserDetail
} from '@ecommerce/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent {
  @Input() public product: Product;

  constructor(
    private router: Router,
    private cartService: CartService,
    private readonly translate: TranslateService,
    private notificationService: NotificationService,
    private authenticationService: AuthenticationService
  ) {}

  public get currentUser(): UserDetail | null {
    return this.authenticationService.currentUserValue;
  }

  public get isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  public viewDetailPage(id: number): void {
    this.router.navigate(['product/' + id]);
  }

  public addToCart(product: Product): void {
    if (this.currentUser) {
      this.cartService.addProduct(product).subscribe((response) => {
        this.router.navigate(['user/cart']);
        this.translate.get('product-added-message').subscribe((value) => {
          this.notificationService.showInfo(value);
        });
      });
    }
  }
}

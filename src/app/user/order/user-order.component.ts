import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  AuthenticationService,
  CartService,
  NotificationService,
  UserDetail
} from '@ecommerce/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: './user-order.component.html',
})
export class UserOrderComponent implements OnInit {
  public CheckoutForm: FormGroup;

  constructor(
    private router: Router,
    private cartService: CartService,
    private readonly translate: TranslateService,
    private notificationService: NotificationService,
    private authenticationService: AuthenticationService
  ) {}

  public ngOnInit(): void {
    this.CheckoutForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern('^((\\+91-?)|0|91)?[0-9]{10}$'),
      ]),
      pincode: new FormControl('', [
        Validators.required,
        Validators.pattern('^[1-9][0-9]{5}$'),
      ]),
      addressline: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100),
      ]),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
    });
  }

  public get currentUser(): UserDetail | null {
    return this.authenticationService.currentUserValue;
  }

  /**
   * Check out method
   */
  public checkout(): void {
    if (this.currentUser) {
      if (this.CheckoutForm.valid) {
        this.cartService.removeAllProducts().subscribe((response) => {
          this.router.navigate(['/']);
          this.translate.get('checkout-message').subscribe((value) => {
            this.notificationService.showSuccess(value);
          });
        });
      } else {
        this.CheckoutForm.markAllAsTouched();
      }
    }
  }
}

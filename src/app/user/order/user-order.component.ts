import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService, NotificationService } from '@ecommerce/core';
import { AppConstants } from '@ecommerce/shared';
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
    private notificationService: NotificationService
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

  public get isLoggedIn(): boolean {
    return (
      !!localStorage.getItem('TOKEN') &&
      localStorage.getItem('TOKEN') === AppConstants.authToken &&
      !!localStorage.getItem('EMAIL')
    );
  }

  /**
   * Check out method
   */
  public checkout(): void {
    if (this.isLoggedIn) {
      const email = localStorage.getItem('EMAIL');
      if (!!email) {
        if (this.CheckoutForm.valid) {
          this.cartService.removeAllProducts(email).subscribe((response) => {
            if (response.success) {
              this.router.navigate(['/products']);
              this.translate.get('checkout-message').subscribe((value) => {
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
        } else {
          this.CheckoutForm.markAllAsTouched();
        }
      }
    } else {
      localStorage.clear();
      this.router.navigate(['user/login']);
    }
  }
}

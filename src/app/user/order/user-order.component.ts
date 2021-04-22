import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartDetail } from 'src/app/shared/models/cart-detail';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  templateUrl: './user-order.component.html',
})
export class UserOrderComponent implements OnInit {
  public CheckoutForm: FormGroup;

  constructor(private router: Router, private cartService: CartService) {}

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

  /**
   * Check out method
   */
  public checkout(): void {
    const email = localStorage.getItem('EMAIL');
    if (!!email) {
      if (this.CheckoutForm.valid) {
        this.cartService.removeAllProducts(email).subscribe((response) => {
          if (response.success) {
            this.router.navigate(['products']);
          }
        });
      } else {
        this.CheckoutForm.markAllAsTouched();
      }
    } else {
      this.router.navigate(['user/login']);
    }
  }
}

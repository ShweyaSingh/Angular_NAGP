import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorizeService } from 'src/app/core/services/authorize.service';
import { AppConstants } from 'src/app/shared/constant/app.constant';

@Component({
  templateUrl: './user-login.component.html',
})
export class UserLoginComponent implements OnInit {
  public userLoginForm: FormGroup;

  constructor(
    private router: Router,
    private authorizeService: AuthorizeService
  ) {}

  public ngOnInit(): void {
    this.userLoginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
    });
  }

  public login(): void {
    if (this.userLoginForm.valid) {
      const email = this.userLoginForm.controls.email.value;
      const password = this.userLoginForm.controls.password.value;
      this.authorizeService
        .getAuthToken(email, password)
        .subscribe((response) => {
          if (response.valid) {
            localStorage.setItem('TOKEN', AppConstants.authToken);
            localStorage.setItem('EMAIL', email);
            this.router.navigate(['user/cart']);
          } else {
            // login failed alert
          }
        });
    } else {
      this.userLoginForm.markAllAsTouched();
    }
  }
}

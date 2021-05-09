import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService, NotificationService } from '@ecommerce/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: './user-login.component.html',
})
export class UserLoginComponent implements OnInit {
  public userLoginForm: FormGroup;
  private returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private readonly translate: TranslateService,
    private notificationService: NotificationService
  ) {}

  public ngOnInit(): void {
    // tslint:disable-next-line: no-string-literal
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

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
      this.authenticationService
        .login(email, password)
        .subscribe((response) => {
          if (response.valid) {
            this.router.navigate([this.returnUrl]);
            this.translate.get('login-success-message').subscribe((value) => {
              this.notificationService.showSuccess(value);
            });
          } else {
            this.translate.get('login-failure-message').subscribe((value) => {
              this.notificationService.showError(value);
            });
          }
        });
    } else {
      this.userLoginForm.markAllAsTouched();
    }
  }
}

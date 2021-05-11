import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService, NotificationService } from '../services';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: AuthenticationService,
    private readonly translate: TranslateService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 400) {
          this.translate.get(err.error.message).subscribe((value) => {
            this.notificationService.showError(value);
          });
        }
        if (err.status === 401) {
          this.authenticationService.logout();
          this.router.navigate(['user/login']);
          this.translate
            .get('something-went-wrong-message')
            .subscribe((value) => {
              this.notificationService.showError(value);
            });
        }

        const error = err.error.message || err.statusText;
        return throwError(error);
      })
    );
  }
}

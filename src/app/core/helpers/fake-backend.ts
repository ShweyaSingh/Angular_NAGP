import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, dematerialize, materialize, mergeMap } from 'rxjs/operators';

const users: any[] = [
  {
    id: 1,
    username: 'test',
    password: 'test',
    firstName: 'Test',
    lastName: 'User',
  },
];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    // wrap in delayed observable to simulate server api call
    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());

    function handleRoute(): Observable<HttpEvent<any>> {
      switch (true) {
        case url.endsWith('/users/authenticate') && method === 'POST':
          return authenticate();
        case url.endsWith('/products') && method === 'GET':
          return getUsers();
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    // route functions
    function authenticate(): Observable<HttpResponse<any>> {
      const { username, password } = body;
      const user = users.find(
        (x) => x.username === username && x.password === password
      );
      if (!user) {
        return error('Username or password is incorrect');
      }
      return ok({
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
      });
    }

    function getUsers(): Observable<HttpResponse<any>> {
      if (!isLoggedIn()) {
        return unauthorized();
      }
      return ok(users);
    }

    // helper functions

    function ok(response: any): Observable<HttpResponse<any>> {
      return of(new HttpResponse({ status: 200, body: response }));
    }

    function error(message: any): Observable<HttpResponse<any>> {
      return throwError({ error: { message } });
    }

    function unauthorized(): Observable<HttpResponse<any>> {
      return throwError({ status: 401, error: { message: 'Unauthorised' } });
    }

    function isLoggedIn(): boolean {
      return (
        headers.get('Authorization') === `Basic ${window.btoa('test:test')}`
      );
    }
  }
}

// export let fakeBackendProvider = {
//   // use fake backend in place of Http service for backend-less development
//   provide: HTTP_INTERCEPTORS,
//   useClass: FakeBackendInterceptor,
//   multi: true,
// };

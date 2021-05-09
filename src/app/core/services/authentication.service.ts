import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserDetail } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private USER_SERVICE_BASE_URL = '/assets/data/users.json';

  private currentUserSubject: BehaviorSubject<UserDetail | null>;

  constructor(private http: HttpClient) {
    const user = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<UserDetail | null>(
      user ? JSON.parse(user) : null
    );
  }

  public get currentUserValue(): UserDetail | null {
    return this.currentUserSubject.value;
  }

  public logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  public login(
    email: string,
    password: string
  ): Observable<{ valid: boolean; content: UserDetail }> {
    return this.http.get<UserDetail[]>(this.USER_SERVICE_BASE_URL).pipe(
      map((userDetails) => {
        const user = userDetails.find(
          (u) => u.email === email && u.password === password
        );
        if (user !== undefined) {
          user.authdata = window.btoa(email + ':' + password);
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return { valid: true, content: user };
        } else {
          return { valid: false, content: new UserDetail() };
        }
      })
    );
  }
}

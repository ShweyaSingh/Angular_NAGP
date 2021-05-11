import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserDetail } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
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

  public login(email: string, password: string): Observable<UserDetail> {
    return this.http
      .post<UserDetail>(`${environment.apiUrl}/users/authenticate`, {
        email,
        password,
      })
      .pipe(
        map((response) => {
          localStorage.setItem('currentUser', JSON.stringify(response));
          this.currentUserSubject.next(response);
          return response;
        })
      );
  }
}

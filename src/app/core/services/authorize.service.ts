import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserDetail } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AuthorizeService {
  private USER_SERVICE_BASE_URL = '/assets/data/users.json';

  constructor(private readonly http: HttpClient) {}

  public getAuthToken(
    email: string,
    password: string
  ): Observable<{ valid: boolean; content: UserDetail }> {
    return this.http.get<UserDetail[]>(this.USER_SERVICE_BASE_URL).pipe(
      map((userDetails) => {
        const user = userDetails.find(
          (u) => u.email === email && u.password === password
        );
        if (user !== undefined) {
          return { valid: true, content: user };
        } else {
          return { valid: false, content: new UserDetail() };
        }
      })
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserDetail } from '../models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private USER_SERVICE_BASE_URL = '/assets/data/users.json';

  constructor(private readonly http: HttpClient) {}

  /**
   * Get user by email
   */
  public getUserByEmail(
    email: string
  ): Observable<{ success: boolean; content: UserDetail }> {
    return this.http.get<UserDetail[]>(this.USER_SERVICE_BASE_URL).pipe(
      map((userDetails) => {
        const user = userDetails.find((u) => u.email === email);
        if (user !== undefined) {
          return { success: true, content: user };
        } else {
          return { success: false, content: new UserDetail() };
        }
      })
    );
  }
}

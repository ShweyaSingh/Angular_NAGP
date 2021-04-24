import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserDetail } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AuthorizeService {
  public getAuthToken(
    email: string,
    password: string
  ): Observable<{ valid: boolean; content: UserDetail }> {
    const user = UserList.find(
      (u) => u.email === email && u.password === password
    );
    if (user !== undefined) {
      return of({ valid: true, content: user });
    } else {
      return of({ valid: false, content: new UserDetail() });
    }
  }
}

const UserList: UserDetail[] = [
  {
    id: 1,
    name: 'Shweta',
    email: 'shweta@gmail.com',
    password: '12345',
    address: '',
    phone: '2233445566',
  },
  {
    id: 2,
    name: 'Swati',
    email: 'swati@gmail.com',
    password: '11111',
    address: '',
    phone: '2233445566',
  },
  {
    id: 3,
    name: 'Chinju',
    email: 'chinju@gmail.com',
    password: '22222',
    address: '',
    phone: '2233445566',
  },
  {
    id: 4,
    name: 'Harsh',
    email: 'harsh@gmail.com',
    password: '33333',
    address: '',
    phone: '2233445566',
  },
];

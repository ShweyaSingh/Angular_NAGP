import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CartDetail } from '../models/cart-detail';
import { ProductCategory } from '../models/product-category';
import { UserDetail } from '../models/user-detail';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  /**
   * Get user by email
   */
  public getUserByEmail(
    email: string
  ): Observable<{ success: boolean; content: UserDetail }> {
    const user = UserList.find((u) => u.email === email);
    if (user !== undefined) {
      return of({ success: true, content: user });
    } else {
      return of({ success: false, content: new UserDetail() });
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

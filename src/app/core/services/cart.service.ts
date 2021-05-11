import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartDetail, Product } from '../models';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartProdctsCount: BehaviorSubject<number>;

  constructor(private http: HttpClient) {
    this.cartProdctsCount = new BehaviorSubject<number>(0);
  }

  public get cartProdctsCountValue(): number {
    return this.cartProdctsCount.value;
  }

  /**
   * Get cart details
   */
  public getCartDetails(): Observable<CartDetail> {
    return this.http
      .get<CartDetail>(`${environment.apiUrl}/carts/getCartDetails`)
      .pipe(
        map((cart) => {
          this.cartProdctsCount.next(cart.products.length);
          return cart;
        })
      );
  }

  /**
   * Add Product
   */
  public addProduct(product: Product): Observable<CartDetail> {
    return this.http
      .post<CartDetail>(`${environment.apiUrl}/carts/addToCart`, {
        product,
      })
      .pipe(
        map((cart) => {
          this.cartProdctsCount.next(cart.products.length);
          return cart;
        })
      );
  }

  /**
   * Delete Product
   */
  public deleteProduct(id: number): Observable<CartDetail> {
    return this.http
      .post<CartDetail>(`${environment.apiUrl}/carts/removeFromCart`, {
        id,
      })
      .pipe(
        map((cart) => {
          this.cartProdctsCount.next(cart.products.length);
          return cart;
        })
      );
  }

  /**
   * Change Qty
   */
  public changeQty(id: number, qty: number): Observable<CartDetail> {
    return this.http
      .post<CartDetail>(`${environment.apiUrl}/carts/updateQty`, {
        id,
        qty,
      })
      .pipe(
        map((cart) => {
          this.cartProdctsCount.next(cart.products.length);
          return cart;
        })
      );
  }

  /**
   * Remove All Product
   */
  public removeAllProducts(): Observable<CartDetail> {
    return this.http
      .post<CartDetail>(`${environment.apiUrl}/carts/emptyCart`, {})
      .pipe(
        map((cart) => {
          this.cartProdctsCount.next(cart.products.length);
          return cart;
        })
      );
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CartDetail, Product } from '../models';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartProdctsCount: BehaviorSubject<number>;

  constructor() {
    this.cartProdctsCount = new BehaviorSubject<number>(0);
  }

  public get cartProdctsCountValue(): number {
    return this.cartProdctsCount.value;
  }

  /**
   * Get cart details
   */
  public getCartDetails(
    email: string
  ): Observable<{ success: boolean; content: CartDetail }> {
    const cart = CartDetails.find((u) => u.email === email);
    if (cart !== undefined) {
      this.cartProdctsCount.next(cart.products.length);
      return of({ success: true, content: cart });
    } else {
      return of({ success: false, content: new CartDetail() });
    }
  }

  /**
   * Add Product
   */
  public addProduct(
    product: Product,
    email: string
  ): Observable<{ success: boolean; content: CartDetail }> {
    const cart = CartDetails.find((u) => u.email === email);
    if (cart !== undefined) {
      const productExist = cart.products.find(
        (p) => p.product.id === product.id
      );
      if (productExist !== undefined) {
        productExist.quantity =
          productExist.quantity === 5 ? 5 : productExist.quantity + 1;
      } else {
        cart.products.push({ product, quantity: 1 });
      }
      this.cartProdctsCount.next(cart.products.length);
      return of({ success: true, content: cart });
    } else {
      return of({ success: false, content: new CartDetail() });
    }
  }

  /**
   * Delete Product
   */
  public deleteProduct(
    id: number,
    email: string
  ): Observable<{ success: boolean; content: CartDetail }> {
    const cart = CartDetails.find((u) => u.email === email);
    if (cart !== undefined) {
      const productToRemove = cart.products.find((p) => p.product.id === id);
      const index = productToRemove
        ? cart.products.indexOf(productToRemove)
        : -1;
      if (index !== -1) {
        cart.products.splice(index, 1);
      }
      this.cartProdctsCount.next(cart.products.length);
      return of({ success: true, content: cart });
    } else {
      return of({ success: false, content: new CartDetail() });
    }
  }

  /**
   * Change Qty
   */
  public changeQty(
    id: number,
    qty: number,
    email: string
  ): Observable<{ success: boolean; content: CartDetail }> {
    const cart = CartDetails.find((u) => u.email === email);
    if (cart !== undefined) {
      const productToUpdate = cart.products.find((p) => p.product.id === id);
      if (productToUpdate !== undefined) {
        productToUpdate.quantity = Number(qty);
      }
      this.cartProdctsCount.next(cart.products.length);
      return of({ success: true, content: cart });
    } else {
      return of({ success: false, content: new CartDetail() });
    }
  }

  /**
   * Remove All Product
   */
  public removeAllProducts(
    email: string
  ): Observable<{ success: boolean; content: CartDetail }> {
    const cart = CartDetails.find((u) => u.email === email);
    if (cart !== undefined) {
      cart.products = [];
      this.cartProdctsCount.next(cart.products.length);
      return of({ success: true, content: cart });
    } else {
      return of({ success: false, content: new CartDetail() });
    }
  }
}

const CartDetails: CartDetail[] = [
  {
    id: 1,
    email: 'shweta@gmail.com',
    products: [],
  },
  {
    id: 2,
    email: 'swati@gmail.com',
    products: [],
  },
  {
    id: 3,
    email: 'chinju@gmail.com',
    products: [],
  },
  {
    id: 4,
    email: 'harsh@gmail.com',
    products: [],
  },
];

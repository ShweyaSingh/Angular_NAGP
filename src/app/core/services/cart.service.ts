import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CartDetail } from '../../shared/models/cart-detail';
import { Product } from '../../shared/models/product';
import { ProductCategory } from '../../shared/models/product-category';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  /**
   * Get cart details
   */
  public getCartDetails(
    email: string
  ): Observable<{ success: boolean; content: CartDetail }> {
    const cart = CartDetails.find((u) => u.email === email);
    if (cart !== undefined) {
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
        productExist.quantity += 1;
      } else {
        cart.products.push({ product, quantity: 1 });
      }
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
    cartDetail: CartDetail
  ): Observable<{ success: boolean; content: CartDetail }> {
    const cart = CartDetails.find((u) => u.email === cartDetail.email);
    if (cart !== undefined) {
      const productToRemove = cart.products.find((p) => p.product.id === id);
      const index = productToRemove
        ? cart.products.indexOf(productToRemove)
        : -1;
      if (index !== -1) {
        cart.products.splice(index, 1);
      }
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
    cartDetail: CartDetail
  ): Observable<{ success: boolean; content: CartDetail }> {
    const cart = CartDetails.find((u) => u.email === cartDetail.email);
    if (cart !== undefined) {
      const productToUpdate = cart.products.find((p) => p.product.id === id);
      if (productToUpdate !== undefined) {
        productToUpdate.quantity = qty;
      }
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
    products: [
      {
        product: {
          id: 1,
          name: 'VAN HEUSEN Heels 1',
          description: 'Women Green Heels Sandal',
          price: 9,
          color: 'Green',
          category: ProductCategory.Footwear,
          imageUrl: '/assets/images/1.jpeg',
        },
        quantity: 3,
      },
      {
        product: {
          id: 2,
          name: 'VAN HEUSEN Heels 2',
          description: 'Women Green Heels Sandal',
          price: 9,
          color: 'Green',
          category: ProductCategory.Footwear,
          imageUrl: '/assets/images/1.jpeg',
        },
        quantity: 1,
      },
    ],
  },
  {
    id: 2,
    email: 'swati@gmail.com',
    products: [
      {
        product: {
          id: 1,
          name: 'VAN HEUSEN Heels 1',
          description: 'Women Green Heels Sandal',
          price: 9,
          color: 'Green',
          category: ProductCategory.Footwear,
          imageUrl: '/assets/images/1.jpeg',
        },
        quantity: 2,
      },
    ],
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

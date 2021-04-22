import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../../shared/models/product';
import { ProductCategory } from '../../shared/models/product-category';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  /**
   * Get All Products
   */
  public getAllProducts(): Observable<Product[]> {
    return of(Products);
  }

  /**
   * getProduct
   */
  public getProduct(
    id: number
  ): Observable<{ success: boolean; content: Product }> {
    const product = Products.find((p) => p.id === id);
    if (product !== undefined) {
      return of({ success: true, content: product });
    } else {
      return of({ success: false, content: new Product() });
    }
  }
}

const Products: Product[] = [
  {
    id: 1,
    name: 'VAN HEUSEN Heels 1',
    description: 'Women Green Heels Sandal',
    price: 9,
    color: 'Green',
    category: ProductCategory.Footwear,
    imageUrl: '/assets/images/1.jpeg',
  },
  {
    id: 2,
    name: 'VAN HEUSEN Heels 2',
    description: 'Women Green Heels Sandal',
    price: 9,
    color: 'Green',
    category: ProductCategory.Footwear,
    imageUrl: '/assets/images/1.jpeg',
  },
  {
    id: 3,
    name: 'VAN HEUSEN Heels 3',
    description: 'Women Green Heels Sandal',
    price: 9,
    color: 'Green',
    category: ProductCategory.Footwear,
    imageUrl: '/assets/images/1.jpeg',
  },
  {
    id: 4,
    name: 'VAN HEUSEN Heels 4',
    description: 'Women Green Heels Sandal',
    price: 9,
    color: 'Green',
    category: ProductCategory.Footwear,
    imageUrl: '/assets/images/1.jpeg',
  },
  {
    id: 5,
    name: 'VAN HEUSEN Heels 5',
    description: 'Women Green Heels Sandal',
    price: 9,
    color: 'Green',
    category: ProductCategory.Footwear,
    imageUrl: '/assets/images/1.jpeg',
  },
  {
    id: 6,
    name: 'VAN HEUSEN Heels 6',
    description: 'Women Green Heels Sandal',
    price: 9,
    color: 'Green',
    category: ProductCategory.Footwear,
    imageUrl: '/assets/images/1.jpeg',
  },
];

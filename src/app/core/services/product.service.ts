import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private PRODUCT_SERVICE_BASE_URL = '/assets/data/products.json';

  constructor(private readonly http: HttpClient) {}

  /**
   * Get All Products
   */
  public getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.PRODUCT_SERVICE_BASE_URL);
  }

  /**
   * getProduct
   */
  public getProduct(
    id: number
  ): Observable<{ success: boolean; content: Product }> {
    return this.http.get<Product[]>(this.PRODUCT_SERVICE_BASE_URL).pipe(
      map((products) => {
        const product = products.find((p) => p.id === id);
        if (product !== undefined) {
          return { success: true, content: product };
        } else {
          return { success: false, content: new Product() };
        }
      })
    );
  }

  /**
   * Search Products
   */
  public searchProducts(search: string): Observable<Product[]> {
    return this.http.get<Product[]>(this.PRODUCT_SERVICE_BASE_URL).pipe(
      map((products) => {
        return products.filter(
          (p) =>
            p.name.toLocaleLowerCase().includes(search) ||
            p.description.toLocaleLowerCase().includes(search)
        );
      })
    );
  }
}

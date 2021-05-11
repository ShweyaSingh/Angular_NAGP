import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { Product, ProductsCategoryWise } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private readonly http: HttpClient) {}

  /**
   * Get All Products
   */
  public getAllProducts(): Observable<ProductsCategoryWise[]> {
    return this.http.get<ProductsCategoryWise[]>(
      `${environment.apiUrl}/products/getAll`
    );
  }

  /**
   * Get Product
   */
  public getProduct(id: number): Observable<Product> {
    return this.http.post<Product>(
      `${environment.apiUrl}/products/getProduct`,
      { id }
    );
  }

  /**
   * Search Products
   */
  public searchProducts(search: string): Observable<Product[]> {
    return this.http.post<Product[]>(
      `${environment.apiUrl}/products/searchProduct`,
      { search }
    );
  }
}
